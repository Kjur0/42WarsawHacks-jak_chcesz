import { Nullable, TDateISO } from "./helpers"

export type Event = {
  id: number
  name: string
  description: string
  location?: Nullable<string>
  begin_at: TDateISO
  end_at: TDateISO
}
