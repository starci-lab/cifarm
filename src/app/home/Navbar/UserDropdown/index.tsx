import { useAppSelector } from "@/redux"
import { Image, AvaButton } from "@/components"
import React, { FC } from "react"
export const UserDropdown: FC = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    return (
        <AvaButton
            icon={<Image src={user?.avatarUrl || "https://avatar.iran.liara.run/public/boy"} className="rounded-full w-8 h-8"/>}
            text={user?.username || "Guest"}
        />
    )
}
