import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiRequest } from "@/lib/api"
import type { Location } from "@/types/location"

export default async function Clusters() {
  const locations = await apiRequest<Array<Location>>(
    `/campus/67/locations`,
    {
      "filter[active]": "true",
      "page[size]": "100",
    }
  )

  return (
    <Card className="w-50 h-50 absolute left-2 top-2">
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-between">
		<p>C1</p>
	  </CardContent>
    </Card>
  )
}
