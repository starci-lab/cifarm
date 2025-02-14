import { AbstractSchema } from "./abstract"
import { UserSchema } from "./user"

export interface SessionSchema extends AbstractSchema {
    refreshToken: string
    expiredAt: Date
    userId?: string
    isActive: boolean
    device?: string
    os?: string
    browser?: string
    ipV4?: string
    user?: UserSchema
}