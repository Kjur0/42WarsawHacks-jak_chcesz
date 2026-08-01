import { Nullable, TDateISO } from "./helpers"
import { Team } from "./team"
import { User } from "./user"

export type Project = {
	id: number
	occurrence: number
	final_mark?: Nullable<number>
	validated?: Nullable<boolean>
	current_team_id?: Nullable<number>
	project: {
		id: number
		name: string
		slug: string
		parent_id?: Nullable<number>
	}
	cursus_ids: Array<number>
	marked_at?: Nullable<TDateISO>
	marked: boolean
	retirable_at?: Nullable<TDateISO>
	created_at: TDateISO
	updated_at?: Nullable<TDateISO>
	user: User
	teams: Array<Team>
}
