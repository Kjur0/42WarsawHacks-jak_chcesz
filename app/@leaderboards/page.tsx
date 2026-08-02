import { apiPagedRequest } from "@/lib/api"
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
import { now, startToday, endToday, CAMPUS_ID } from "@/lib/consts"
import { User } from "@/types/user"

export default async function Page() {
  const locations = await apiPagedRequest<Location>(
    `/campus/${CAMPUS_ID}/locations`,
    {
      "range[begin_at]": `${startToday().toInstant().toString()},${endToday().toInstant().toString()}`,
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

  const totalLogtimes: Record<number, User & { hours: number }> = {}

  for (const location of locations) {
    const beginAt = Temporal.Instant.from(location.begin_at)
    const endAt = Temporal.Instant.from(location.end_at ?? now())

    totalLogtimes[location.user!.id] ??= {
      hours: 0,
      ...location.user!,
    }
    totalLogtimes[location.user!.id].hours += endAt
      .since(beginAt)
      .total("hours")
  }

  const leaderboard = Object.values(totalLogtimes)
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 5)

  return (
    <Card className="h-115 w-75">
      <CardHeader>
        <CardTitle>Todays Logtimes</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {leaderboard.map(({ hours, ...user }, index) => (
            <Item key={`leaderboard-${user.id}`} variant="outline">
              <span className="w-6 text-center font-bold">#{index + 1}</span>
              <ItemMedia>
                <Avatar size="lg">
                  <AvatarImage src={user.image?.link} />
                  <AvatarFallback>
                    {user.first_name?.charAt(0)}
                    {user.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemTitle>{user.login}</ItemTitle>
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
