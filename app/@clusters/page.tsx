import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Marker, MarkerContent } from "@/components/ui/marker"
import { apiPagedRequest } from "@/lib/api"
import { CAMPUS_ID } from "@/lib/consts"
import { isErrorResponse } from "@/types/helpers"
import type { Location } from "@/types/location"

export const dynamic = "force-dynamic"

export default async function Clusters() {
  const locations = await apiPagedRequest<Location>(
    `/campus/${CAMPUS_ID}/locations`,
    {
      "filter[active]": "true"
    }
  )

  if (isErrorResponse(locations)) {
    return (
      <Card className="h-75 w-125">
        <CardHeader>
          <CardTitle>Cluster activity </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            Error occurred while fetching location data.
          </p>
        </CardContent>
      </Card>
    )
  }

  const cluster1 = locations.filter((location) =>
    location.host?.startsWith("c1")
  )
  const cluster2 = locations.filter((location) =>
    location.host?.startsWith("c2")
  )
  const cluster3 = locations.filter((location) =>
    location.host?.startsWith("c3")
  )

  return (
    <Card className="h-75 w-125">
      <CardHeader>
        <CardTitle>
          Cluster activity
          <Badge variant="outline">{locations.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Marker variant="separator" className="mt-2 mb-1">
          <MarkerContent>
            Cluster 1 <Badge>{cluster1.length}</Badge>
          </MarkerContent>
        </Marker>
        <AvatarGroup>
          {cluster1.splice(0, 14).map((location, i) =>
            i == 13 && cluster1.length > 0 ? (
              <AvatarGroupCount key="c1-groupCount">
                +{cluster1.length + 1}
              </AvatarGroupCount>
            ) : (
              <Avatar key={location?.id} size="lg">
                <AvatarImage src={location?.user?.image?.link} />
                <AvatarFallback>
                  {location?.user?.first_name?.[0]}
                  {location?.user?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
            )
          )}
        </AvatarGroup>
        <Marker variant="separator" className="mt-2 mb-1">
          <MarkerContent>
            Cluster 2 <Badge>{cluster2.length}</Badge>
          </MarkerContent>
        </Marker>
        <AvatarGroup>
          {cluster2.splice(0, 14).map((location, i) =>
            i == 13 && cluster2.length > 0 ? (
              <AvatarGroupCount key="c2-groupCount">
                +{cluster2.length + 1}
              </AvatarGroupCount>
            ) : (
              <Avatar key={location?.id} size="lg">
                <AvatarImage src={location?.user?.image?.link} />
                <AvatarFallback>
                  {location?.user?.first_name?.[0]}
                  {location?.user?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
            )
          )}
        </AvatarGroup>
        <Marker variant="separator" className="mt-2 mb-1">
          <MarkerContent>
            Cluster 3 <Badge>{cluster3.length}</Badge>
          </MarkerContent>
        </Marker>
        <AvatarGroup>
          {cluster3.splice(0, 14).map((location, i) =>
            i == 13 && cluster3.length > 0 ? (
              <AvatarGroupCount key="c3-groupCount">
                +{cluster3.length + 1}
              </AvatarGroupCount>
            ) : (
              <Avatar key={location?.id} size="lg">
                <AvatarImage src={location?.user?.image?.link} />
                <AvatarFallback>
                  {location?.user?.first_name?.[0]}
                  {location?.user?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
            )
          )}
        </AvatarGroup>
      </CardContent>
    </Card>
  )
}
