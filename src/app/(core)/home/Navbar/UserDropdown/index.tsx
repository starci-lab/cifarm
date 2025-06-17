import { setAuthenticated, useAppDispatch, useAppSelector } from "@/redux"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, Separator, AvaButton2, DropdownContent } from "@/components"
import React, { FC } from "react"
import { Gear, ShareNetwork, SignOut, User } from "@phosphor-icons/react"
import { useGraphQLMutationLogoutSwrMutation, useRouterWithSearchParams } from "@/hooks"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { createJazziconBlobUrl } from "@/modules/jazz"
import useSWRMutation from "swr/mutation"
import { useDisclosure } from "react-use-disclosure"
import { useSingletonHook } from "@/singleton"
import { REFERRAL_DISCLOSURE } from "@/singleton"

export const UserDropdown: FC = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    const router = useRouterWithSearchParams()

    const { swrMutation: logoutSwrMutation } = useGraphQLMutationLogoutSwrMutation()
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(REFERRAL_DISCLOSURE)
    const dispatch = useAppDispatch()   
    const { trigger, isMutating } = useSWRMutation("LOGOUT_DATA", async () => {
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
        // delete all session data
        await Promise.all([
            sessionDb.keyValueStore.delete(SessionDbKey.RefreshToken),
            sessionDb.keyValueStore.delete(SessionDbKey.AccessToken),
        ])
        dispatch(setAuthenticated(false))
    })
    return (

        <DropdownMenu>
            <DropdownMenuTrigger className="hover:opacity-75 transition-opacity duration-200">
                <AvaButton2
                    imageUrl={user?.avatarUrl || createJazziconBlobUrl(user?.id || "")}
                    as="div"
                />  
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2 w-52 bg-content-2">
                <DropdownMenuItem className="py-2 cursor-pointer hover:bg-background hover:text-secondary text-muted-foreground" 
                    onClick={() => {
                        router.push("/home/profile")
                    }}
                >
                    <DropdownContent
                        icon={<User />}
                    >
                        Profile
                    </DropdownContent>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 cursor-pointer hover:bg-background hover:text-secondary text-muted-foreground"
                    onClick={
                        open
                    }
                >
                    <DropdownContent
                        icon={<ShareNetwork />}
                    >
                        Referral
                    </DropdownContent>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 cursor-pointer hover:bg-background hover:text-secondary text-muted-foreground"
                    onClick={() => {
                        router.push("/home/settings")
                    }}
                >
                    <DropdownContent
                        icon={<Gear />}
                    >
                        Settings
                    </DropdownContent>
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem className="py-2 cursor-pointer hover:bg-background hover:text-secondary text-muted-foreground">
                    <DropdownContent    
                        onClick={async () => {
                            await trigger()
                        }}
                        icon={<SignOut />}
                        isLoading={isMutating}
                    >
                        Logout
                    </DropdownContent>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
