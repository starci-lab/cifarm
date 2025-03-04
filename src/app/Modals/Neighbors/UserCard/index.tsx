import { UserSchema } from "@/modules/entities"
import React, { FC } from "react"

export interface UserCardProps {
    user: UserSchema
}
export const UserCard: FC<UserCardProps> = ({ user }: UserCardProps) => {
    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}