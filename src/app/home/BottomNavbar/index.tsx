"use client"

import React, { FC } from "react"
import {
    useGraphQLQueryInventoriesSwr,
    useGraphQLQueryStaticSwr,
    useGraphQLQueryUserSwr,
    useRouterWithSearchParams,
} from "@/hooks"
import { pathConstants } from "@/constants"
import { useAppSelector } from "@/redux"
import {
    GRAPHQL_QUERY_INVENTORIES_SWR,
    GRAPHQL_QUERY_STATIC_SWR,
    GRAPHQL_QUERY_USER_SWR,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { EnhancedButton } from "@/components"
import { BlocksIcon, GiftIcon, TwitterIcon, UserCircleIcon } from "lucide-react"

export const BottomNavbar: FC = () => {
    const router = useRouterWithSearchParams()
    const authenticated = useAppSelector(
        (state) => state.sessionReducer.authenticated
    )
    // check if all required data is loaded
    const { swr: inventoriesSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryInventoriesSwr>
  >(GRAPHQL_QUERY_INVENTORIES_SWR)
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(GRAPHQL_QUERY_USER_SWR)

    const allDataLoaded = inventoriesSwr.data && staticSwr.data && userSwr.data

    return (
        <div className="m-auto fixed top-auto bottom-0 border-t h-16 z-50 max-w-[500px] w-full bg-background">
            <nav className="m-auto w-full h-full flex items-center justify-between px-4">
                <div className="flex-1 flex justify-between">
                    <EnhancedButton
                        variant="ghost"
                        className="flex-1 flex flex-col items-center justify-center h-full gap-1"
                        onClick={() => router.push(pathConstants.profile)}
                    >
                        <UserCircleIcon className="w-5 h-5 min-w-5 min-h-5" />
                        <div className="text-xs h-4 flex items-center">Profile</div>
                    </EnhancedButton>
                    <EnhancedButton
                        variant="ghost"
                        className="flex-1 flex flex-col items-center justify-center h-full gap-1"
                        onClick={() => router.push(pathConstants.partnerships)}
                    >
                        <GiftIcon className="w-5 h-5 min-h-5 min-w-5" />
                        <div className="text-xs h-4 flex items-center">Partnerships</div>
                    </EnhancedButton>
                </div>
                <div className="flex-1 flex justify-center">
                    <EnhancedButton
                        disabled={!(authenticated && allDataLoaded)}
                        size="lg"
                        className="text-background"
                        onClick={() => router.push(pathConstants.play)}
                    >
                        Play
                    </EnhancedButton>
                </div>
                <div className="flex-1 flex justify-end">
                    <EnhancedButton
                        variant="ghost"
                        className="flex-1 flex flex-col items-center justify-center h-full"
                    >
                        <BlocksIcon className="w-5 h-5 min-w-5 min-h-5" />
                        <div className="text-[10px] h-4 flex items-center">
                            DApps
                        </div>
                    </EnhancedButton>
                    <EnhancedButton
                        variant="ghost"
                        className="flex-1 flex flex-col items-center justify-center h-full"
                    >
                        <TwitterIcon className="w-5 h-5 min-w-5 min-h-5" />
                        <div className="text-[10px] h-4 flex items-center">
                            Social
                        </div>
                    </EnhancedButton>
                </div>
            </nav>
        </div>
    )
}
