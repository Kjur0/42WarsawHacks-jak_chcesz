import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { apiRequest } from "@/lib/api"
import { isErrorResponse } from "@/types/helpers"
import type { Event } from "@/types/event"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { RiEmotionSadLine } from "@remixicon/react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"

export default async function Events() {
  const events = await apiRequest<Array<Event>>("/campus/67/events", {
    "range[begin_at]": `${Temporal.Now.plainDateISO().toPlainDateTime().toString()}Z,${Temporal.Now.plainDateISO().add({ weeks: 2 }).toPlainDateTime().toString()}Z`,
    sort: "begin_at",
  })

  if (isErrorResponse(events)) {
    return (
      <Card className="h-120 w-120">
        <CardHeader>
          <CardTitle>Upcoming events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            Error occurred while fetching event data.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-120 w-120">
      <CardHeader>
        <CardTitle>Upcoming events</CardTitle>
      </CardHeader>
      <CardContent className="h-full scroll-fade-y scrollbar-none overflow-y-auto">
        {events.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <RiEmotionSadLine className="h-10 w-10" />
              </EmptyMedia>
              <EmptyTitle>No upcoming events</EmptyTitle>
            </EmptyHeader>
          </Empty>
        ) : (
          <ItemGroup className="w-full">
            {events.map((event) => (
              <Item key={event.id} variant="muted">
                <ItemContent>
                  <ItemTitle>{event.name}</ItemTitle>
                  <ItemDescription>{event.description}</ItemDescription>
                </ItemContent>
                <ItemFooter>
                  {Temporal.Instant.from(event.begin_at).toLocaleString(
                    "pl-PL",
                    {
                      dateStyle: "short",
                      timeStyle: "short",
                      timeZone: "Europe/Warsaw",
                    }
                  )}{" "}
                  -{" "}
                  {Temporal.Instant.from(event.end_at).toLocaleString("pl-PL", {
                    dateStyle: "short",
                    timeStyle: "short",
                    timeZone: "Europe/Warsaw",
                  })}{" "}
                  @ {event.location}
                </ItemFooter>
              </Item>
            ))}
          </ItemGroup>
        )}
      </CardContent>
    </Card>
  )
}
