export const RESET_TIME = {
  hour: 5,
  minute: 0,
  second: 0,
  millisecond: 0,
  nanosecond: 0,
} as const

export const now = () => Temporal.Now.zonedDateTimeISO("Europe/Warsaw")
export const startToday = () =>
  now().hour < 5
    ? now().subtract({ days: 1 }).with(RESET_TIME)
    : now().with(RESET_TIME)
export const endToday = () => startToday().add({ days: 1 })

export const CAMPUS_ID = 67 as const
