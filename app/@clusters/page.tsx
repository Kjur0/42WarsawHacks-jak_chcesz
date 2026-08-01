import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"
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

  const mapper = (location: Location) => location.user

  const cluster1 = locations.filter((location) => location.host?.startsWith('c1')).map(mapper)
  const cluster2 = locations.filter((location) => location.host?.startsWith('c2')).map(mapper)
  const cluster3 = locations.filter((location) => location.host?.startsWith('c3')).map(mapper)

  return (
    <Card className="w-50 h-50 absolute left-2 top-2">
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-between">
		<p>C1</p>
		<AvatarGroup>
			{cluster1.map((user) => (
				<Avatar key={user?.id} size="lg" >
					<AvatarImage src={user?.image.link}/>
					<AvatarFallback>{user?.first_name[0]}{user?.last_name[0]}</AvatarFallback>
				</Avatar>
			))}
		</AvatarGroup>
		<p>C2</p>
		<AvatarGroup>
			{cluster2.map((user) => (
				<Avatar key={user?.id} size="lg" >
					<AvatarImage src={user?.image.link}/>
					<AvatarFallback>{user?.first_name[0]}{user?.last_name[0]}</AvatarFallback>
				</Avatar>
			))}
		</AvatarGroup>
		<p>C3</p>
		<AvatarGroup>
			{cluster3.map((user) => (
				<Avatar key={user?.id} size="lg" >
					<AvatarImage src={user?.image.link}/>
					<AvatarFallback>{user?.first_name[0]}{user?.last_name[0]}</AvatarFallback>
				</Avatar>
			))}
		</AvatarGroup>
	  </CardContent>
    </Card>
  )
}
