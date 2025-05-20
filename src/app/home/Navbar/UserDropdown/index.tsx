import { useAppSelector } from "@/redux"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, Link, DropdownMenuContent, Separator, AvaButton2 } from "@/components"
import React, { FC } from "react"
import { Gear, SignOut, User } from "@phosphor-icons/react"
import { useGraphQLMutationLogoutSwrMutation, useRouterWithSearchParams } from "@/hooks"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { createJazziconBlobUrl } from "@/modules/jazz"

export const UserDropdown: FC = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    const router = useRouterWithSearchParams()

    const { swrMutation: logoutSwrMutation } = useGraphQLMutationLogoutSwrMutation()
    return (

        <DropdownMenu>
            <DropdownMenuTrigger className="hover:opacity-75 transition-opacity duration-200">
                <AvaButton2
                    imageUrl={user?.avatarUrl || createJazziconBlobUrl(user?.id || "")}
                    as="div"
                />  
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2 w-52 bg-content-4">
                <DropdownMenuItem className="py-2 cursor-pointer hover:bg-background hover:text-secondary text-muted-foreground" 
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
    )
}
