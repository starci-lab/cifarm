export const SESSION_COOKIE_NAME = "session"
export const SESSION_COOKIE_MAX_AGE = 60 * 5 // 5 minutes
export interface SessionCookieData {
    pin: string
}