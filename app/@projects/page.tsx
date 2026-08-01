import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { apiRequest } from "@/lib/api"
import { isErrorResponse } from "@/types/helpers"
import { Project } from "@/types/project"

export default async function Projects() {
  const projects = await apiRequest<Array<Project>>("/projects_users", {
    "filter[campus]": "67",
    "filter[marked]": "true",
    "range[marked_at]": `${Temporal.Now.plainDateISO().subtract({weeks:1}).toPlainDateTime().toString()},${Temporal.Now.plainDateISO().add({days:1}).toPlainDateTime().toString()}`,
  })

  if (isErrorResponse(projects)) {
    return (
      <Card className="h-75 w-75">
        <CardHeader>
          <CardTitle>Recently finished projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            Error occurred while fetching project data.
          </p>
        </CardContent>
      </Card>
    )
  }

  const validatedProjects = projects.filter((project) => project.validated)

  return (
    <Card>
      <CardHeader>
      <CardTitle>Recently finished projects</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item>
            <ItemMedia>
              <AvatarGroup>
                <Avatar>
                  <AvatarFallback>KJ</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>TW</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>42-Warsaw-Hacks</ItemTitle>
              <ItemDescription>kjurkows, twloskow</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge>100</Badge>
            </ItemActions>
          </Item>
          <Item>
            <ItemMedia>
              <AvatarGroup>
                <Avatar>
                  <AvatarFallback>KJ</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>TW</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>42-Warsaw-Hacks</ItemTitle>
              <ItemDescription>kjurkows, twloskow</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge>100</Badge>
            </ItemActions>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
