import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Item,
  ItemTitle,
  ItemMedia,
  ItemContent,
    ItemGroup,
} from "@/components/ui/item"
import { request } from "@/lib/api"
import { Coalition } from "@/types/coalition"

export default async function Page() {
  const coalitions = await request<Coalition[]>("/blocs/129/coalitions")

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Coalitions</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {coalitions.map((coalition) => (
            <Item
              key={coalition.id}
              variant="outline"
              className="rounded-xl"
              style={{ backgroundColor: coalition.color }}
              render={<a href="#">
              <ItemMedia variant="image">
                <img
                  src={coalition.image_url}
                  alt={coalition.name}
                  className="object-cover brightness-0 invert"
                />
              </ItemMedia>
              <ItemTitle>{coalition.name}</ItemTitle>
              <ItemContent className="flex-none text-center ml-auto">
                <Badge variant="outline" >
                  {coalition.score.toLocaleString()}
                </Badge>
              </ItemContent>
          </a>} />
        ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
