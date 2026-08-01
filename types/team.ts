import { Nullable } from "./helpers"
import { User } from "./user"

export type Team = {
	id: number
	name: string
	url: string
	final_mark?: Nullable<number>
	project_id: number
	users: Array<User>
}
