import { apiRequest } from "@/lib/api"
import { Location } from "@/types/location"
import { isErrorResponse } from "@/types/helpers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function Page() {
  const now = Temporal.Now.zonedDateTimeISO("Europe/Warsaw")
  const today = now.startOfDay()

  let page = 1
  let hasMore = true
  const allLocations: Array<Location> = []

  while (hasMore) {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Remove after merge, rate limit handling is implemented in apiRequest on main
    const locations = await apiRequest<Array<Location>>(
      `/campus/67/locations`,
      {
        "range[begin_at]": `${today.subtract({ days: 1 }).toInstant().toString()},${now.toInstant().toString()}`,
        "page[size]": "100",
        "page[number]": page.toString(),
      }
    )
    if (isErrorResponse(locations)) {
      return (
        <Card className="h-115 w-75">
          <CardHeader>
            <CardTitle>Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              Error occurred while fetching location data.
            </p>
          </CardContent>
        </Card>
      )
    }
    allLocations.push(...locations)
    hasMore = locations.length === 100
    page++
  }

  const totalLogtimes: Record<string, { image_url: string; hours: number }> = {}

  for (const location of allLocations) {
    if (!location.user) continue

    const locationBeginAt = Temporal.Instant.from(
      location.begin_at
    ).toZonedDateTimeISO("Europe/Warsaw")

    const isBeforeToday =
      Temporal.ZonedDateTime.compare(locationBeginAt, today) < 0
    const beginAt = isBeforeToday ? today : locationBeginAt

    const endAt = location.end_at
      ? Temporal.Instant.from(location.end_at).toZonedDateTimeISO(
          "Europe/Warsaw"
        )
      : now

    if (Temporal.ZonedDateTime.compare(endAt, today) < 0) continue

    totalLogtimes[location.user.login] ??= {
      image_url: location.user.image!.versions.small,
      hours: 0,
    }
    totalLogtimes[location.user.login].hours += endAt
      .since(beginAt)
      .total("hours")
  }

  const leaderboard = Object.entries(totalLogtimes)
    .sort(([, a], [, b]) => b.hours - a.hours)
    .slice(0, 5)

  return (
    <Card className="h-115 w-75">
      <CardHeader>
        <CardTitle>Todays Logtimes</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {leaderboard.map(([login, { image_url, hours }], index) => (
            <Item key={login} variant="outline">
              <span className="w-6 text-center font-bold">#{index + 1}</span>
              <ItemMedia>
                <Avatar key={login} size="lg">
                  <AvatarImage src={image_url} alt={login} />
                  <AvatarFallback>{login.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemTitle>{login}</ItemTitle>
              <ItemContent className="ml-auto flex-none text-center">
                <Badge variant="outline">{hours.toFixed(1)}h</Badge>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
