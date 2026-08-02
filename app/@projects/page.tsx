import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Skeleton } from "@/components/ui/skeleton"
import { apiRequest } from "@/lib/api"
import { CAMPUS_ID, startToday, endToday } from "@/lib/consts"
import { ErrorResponse, isErrorResponse } from "@/types/helpers"
import { Project } from "@/types/project"
import { User } from "@/types/user"
import { RiEmotionSadLine } from "@remixicon/react"
import { Suspense } from "react"
import { Fragment } from "react/jsx-runtime"

async function ProjectItem({ project }: { project: Project }) {
  const team = project.teams.pop()

  let users: Array<User> | ErrorResponse = []

  if (team?.users.length != 1) {
    const userIds = team?.users.map((user) => user.id).join(",")

    users = await apiRequest<Array<User>>("/users", {
      "filter[id]": userIds ?? "",
    })

    if (isErrorResponse(users)) {
      return <Fragment key={project.id} />
    }
  } else {
    users = [project.user]
  }

  return (
    <Item className="h-15 w-full">
      <ItemMedia>
        <AvatarGroup>
          {users.map((user) => (
            <Avatar key={`${project.id}-${user.id}`}>
              <AvatarImage src={user.image?.link} />
              <AvatarFallback>
                {user.first_name?.[0]}
                {user.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{project.project.name}</ItemTitle>
        <ItemDescription>{team?.name}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge>{project.final_mark}</Badge>
      </ItemActions>
    </Item>
  )
}

export default async function Projects() {
  const projects = await apiRequest<Array<Project>>("/projects_users", {
    "filter[campus]": CAMPUS_ID.toString(),
    "filter[marked]": "true",
    "range[marked_at]": `${startToday().toInstant().toString({ smallestUnit: "minute" })},${endToday().toInstant().toString({ smallestUnit: "minute" })}`,
  })

  if (isErrorResponse(projects)) {
    return (
      <Card className="h-full w-100">
        <CardHeader>
          <CardTitle>Projects validated today</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            Error occurred while fetching project data.
          </p>
        </CardContent>
      </Card>
    )
  }

  const validatedProjects = projects.filter((project) => project["validated?"])

  return (
    <Card className="h-full w-100">
      <CardHeader>
        <CardTitle>Projects validated today</CardTitle>
      </CardHeader>
      <CardContent className="h-full scroll-fade-y scrollbar-none overflow-y-auto">
        <ItemGroup className="gap-0">
          {validatedProjects.length > 0 ? (
            validatedProjects.map((project, i) => (
              <Suspense
                key={project.id}
                fallback={<Skeleton className="h-15 w-full" />}
              >
                <ProjectItem project={project} key={project.id} />
                {i < validatedProjects.length - 1 && <ItemSeparator />}
              </Suspense>
            ))
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <RiEmotionSadLine />
                </EmptyMedia>
                <EmptyTitle>No one has finished a project recently.</EmptyTitle>
              </EmptyHeader>
            </Empty>
          )}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
