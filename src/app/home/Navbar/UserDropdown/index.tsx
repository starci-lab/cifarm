import { useAppSelector } from "@/redux"
import { Image, AvaButton, DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, Link, DropdownMenuContent, Separator } from "@/components"
import React, { FC } from "react"
import { Gear, SignOut, User } from "@phosphor-icons/react"
import { useGraphQLMutationLogoutSwrMutation, useRouterWithSearchParams } from "@/hooks"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { truncateString } from "@/modules/common"

export const UserDropdown: FC = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    const router = useRouterWithSearchParams()

    const { swrMutation: logoutSwrMutation } = useGraphQLMutationLogoutSwrMutation()

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <AvaButton
                        icon={<Image src={user?.avatarUrl || "https://avatar.iran.liara.run/public/boy"} className="rounded-full w-8 h-8"/>}
                        text={truncateString(user?.username || "", 12, 0)}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="p-2 w-52 bg-content-4">
                    <DropdownMenuItem className="py-2 cursor-pointer hover:bg-background hover:text-secondary  text-muted-foreground" 
                        onClick={() => {
                            router.push("/home/profile")
                        }}
                    >
                        <Link classNames={{
                            base: "flex items-center gap-3",
                        }}
                        >
                            <User className="w-5 h-5" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2 cursor-pointer hover:bg-background hover:text-secondary text-muted-foreground"
                        onClick={() => {
                            router.push("/home/settings")
                        }}
                    >
                        <Link
                            classNames={{
                                base: "flex items-center gap-3",
                            }}
                        >
                            <Gear className="w-5 h-5" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                    <Separator className="my-1" />
                    <DropdownMenuItem className="py-2 cursor-pointer hover:bg-background hover:text-secondary text-muted-foreground"
                        onClick={async () => {
                            const refreshToken = await sessionDb.keyValueStore.get(
                                SessionDbKey.RefreshToken
                            )
                            if (!refreshToken) {
                                return
                            }
                            await logoutSwrMutation.trigger({
                                request: {
                                    refreshToken: refreshToken.value
                                }
                            })
                            router.push("/sign-in")
                        }}
                    >
                        <Link
                            classNames={{
                                base: "flex items-center gap-3",
                            }}
                        >
                            <SignOut className="w-5 h-5" />
                            <span>Logout</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
