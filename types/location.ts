import { User } from "./user"
import { TDateISO, Nullable } from "./helpers"

export type Location = {
  id: number
  begin_at: TDateISO
  end_at: TDateISO
  primary: boolean
  floor?: Nullable<number>
  row?: Nullable<number>
  post?: Nullable<string>
  host?: Nullable<string>
  campus_id: number
  user: User
}
