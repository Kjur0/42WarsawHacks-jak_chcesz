export type User = {
  id: number
  email?: string
  login: string
  first_name?: string
  last_name?: string
  usual_full_name?: string
  usual_first_name?: string
  url: string
  phone?: string
  displayname?: string
  kind?: "student" | "staff" | "alumni" | "teacher" | "admin"
  image?: {
    link: string
    versions: Record<"micro" | "small" | "medium" | "large", string>
  }
}
