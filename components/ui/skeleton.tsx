import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse corner-sharp bg-primary", className)}
      {...props}
    />
  )
}

export { Skeleton }
