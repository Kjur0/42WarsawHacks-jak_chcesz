"use server"

import { ErrorResponse, isErrorResponse } from "@/types/helpers"

const API_URL = "https://api.intra.42.fr/v2"

type ApiRequest = {
  resolve: (value: Response) => void
  url: URL
}

const requests: Array<ApiRequest> = []

let requestLoop: ReturnType<typeof setInterval> | null = null

export async function apiRequest<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T | ErrorResponse> {
  const url = new URL(`${API_URL}${path}`)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  const response = await new Promise<Response>((resolve) => {
    requests.push({ resolve, url })
    if (requestLoop === null) {
      requestLoop = setInterval(async () => {
        if (requests.length > 0) {
          const { resolve, url } = requests.shift()!
          const response = await fetch(url.toString(), {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          })
          resolve(response)
        } else {
          if (requestLoop !== null) {
            clearInterval(requestLoop)
            requestLoop = null
          }
        }
      }, 500)
    }
  })

  if (!response.ok) {
    return { error: response.status, message: response.statusText }
  }

  return (await response.json()) as T
}

export async function apiPagedRequest<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<Array<T> | ErrorResponse> {
  let lastResult: number = 0
  const results: Array<T> = []
  let page = 1

  do {
    const result = await apiRequest<Array<T>>(path, {
      ...params,
      "page[size]": "100",
      "page[number]": page.toString(),
    })

    if (isErrorResponse(result)) {
      return result
    }
    lastResult = result.length
    results.push(...result)
    page++
  } while (lastResult > 0)

  return results
}

type TokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  created_at: number
}

let tokenCache: { expired: boolean; token?: string } = { expired: true }

async function getToken() {
  if (!tokenCache.expired) {
    return tokenCache.token
  }

  const clientId = process.env.UID!
  const clientSecret = process.env.SECRET!

  const data = new FormData()
  data.append("grant_type", "client_credentials")
  data.append("client_id", clientId)
  data.append("client_secret", clientSecret)
  data.append("scope", "public")

  const response = await fetch(`${API_URL}/oauth/token`, {
    method: "POST",
    body: data,
  })

  if (!response.ok) {
    return ""
  }

  const tokenResponse = (await response.json()) as TokenResponse

  tokenCache = { token: tokenResponse.access_token, expired: false }

  setTimeout(
    () => {
      tokenCache.expired = true
    },
    tokenResponse.expires_in * 1000 - 15000
  ) // Refresh 15 seconds before expiration

  return tokenCache.token
}
