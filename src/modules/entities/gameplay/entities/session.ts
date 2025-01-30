import { UuidAbstractEntity } from "./abstract"
import { UserEntity } from "./user"

export interface SessionEntity extends UuidAbstractEntity {
    refreshToken: string
    expiredAt: Date
    userId?: string
    isActive: boolean
    device?: string
    os?: string
    browser?: string
    ipV4?: string
    user?: UserEntity
}