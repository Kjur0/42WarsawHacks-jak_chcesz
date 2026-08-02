import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Item,
  ItemTitle,
  ItemMedia,
  ItemContent,
  ItemGroup,
} from "@/components/ui/item"
import { apiRequest } from "@/lib/api"
import { Coalition } from "@/types/coalition"
import { isErrorResponse } from "@/types/helpers"
import Image from "next/image"

export default async function Page() {
  const coalitions = await apiRequest<Coalition[]>("/blocs/129/coalitions")

  if (isErrorResponse(coalitions)) {
    return (
      <Card className="h-75 w-75">
        <CardHeader>
          <CardTitle>Coalitions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            Error occurred while fetching coalition data.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-75 w-75">
      <CardHeader>
        <CardTitle>Coalitions</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {coalitions
            .sort((a, b) => b.score - a.score)
            .map((coalition) => (
              <Item
                key={coalition.id}
                variant="outline"
                style={{ backgroundColor: coalition.color }}
                render={
                  <a href="#">
                    <ItemMedia variant="image">
                      <Image
                        width={32}
                        height={32}
                        src={coalition.image_url}
                        alt={coalition.name}
                        className="object-cover brightness-0 invert"
                      />
                    </ItemMedia>
                    <ItemTitle>{coalition.name}</ItemTitle>
                    <ItemContent className="ml-auto flex-none text-center">
                      <Badge variant="outline">
                        {coalition.score.toLocaleString()}
                      </Badge>
                    </ItemContent>
                  </a>
                }
              />
            ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
