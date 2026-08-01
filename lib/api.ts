"use server"

const API_URL = "https://api.intra.42.fr/v2"

export async function request<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${API_URL}${path}`)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json() as T
}

type TokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  created_at: number
}

let tokenCache: { token: string; expiresAt: number } | null = null

async function getToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() / 1000) {
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
    body: data
  })

  if (!response.ok) {
    throw new Error(`Token request failed with status ${response.status}`)
  }

  const tokenResponse = await response.json() as TokenResponse

  const expiresAt = tokenResponse.created_at + tokenResponse.expires_in * 1000

  tokenCache = { token: tokenResponse.access_token, expiresAt }

  return tokenCache.token
}
