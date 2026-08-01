import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <Skeleton className="mt-4 h-6 w-1/2 bg-accent-foreground" />
        </div>
      </div>
    </div>
  )
}
