import { useAppSelector } from "@/redux"
import { Image, AvaButton, DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, Link, DropdownMenuContent } from "@/components"
import React, { FC } from "react"
import { Gear, SignOut, User } from "@phosphor-icons/react"
export const UserDropdown: FC = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <AvaButton
                        icon={<Image src={user?.avatarUrl || "https://avatar.iran.liara.run/public/boy"} className="rounded-full w-8 h-8"/>}
                        text={user?.username || "Guest"}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Link href="/profile">
                            <User className="w-4 h-4" />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/settings">
                            <Gear className="w-4 h-4" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/logout">
                            <SignOut className="w-4 h-4" />
                            Logout
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
