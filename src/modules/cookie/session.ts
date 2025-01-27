import dayjs from "dayjs"

export const SESSION_COOKIE_NAME = "session"
export const getSessionCookieMaxAge = () => dayjs().add(5, "minutes").toDate()
export interface SessionCookieData {
    pin: string
}