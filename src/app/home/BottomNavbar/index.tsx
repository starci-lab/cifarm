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
import { ExtendedButton } from "@/components"
import { BlocksIcon, GiftIcon, TwitterIcon, CoinsIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

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

    const isMobile = useIsMobile()

    return (
        <>
            {isMobile && (
                <div className="m-auto fixed top-auto bottom-0 border-t h-16 z-50 max-w-[500px] w-full bg-background">
                    <nav className="m-auto w-full h-full flex items-center justify-between px-4">
                        <div className="flex-1 flex justify-between">
                            <div className="flex flex-1 grid place-items-center">
                                <ExtendedButton
                                    variant="ghost"
                                    className="flex-1 flex flex-col items-center justify-center h-full gap-1 w-fit"
                                    onClick={() => router.push(pathConstants.assets)}
                                >
                                    <CoinsIcon className="w-5 h-5 min-w-5 min-h-5" />
                                    <div className="text-[10px] h-4 flex items-center">Assets</div>
                                </ExtendedButton>
                            </div>
                            <div className="flex flex-1 grid place-items-center">
                                <ExtendedButton
                                    variant="ghost"
                                    className="flex-1 flex flex-col items-center justify-center h-full gap-1"
                                    onClick={() => router.push(pathConstants.partnerships)}
                                >
                                    <GiftIcon className="w-5 h-5 min-h-5 min-w-5" />
                                    <div className="text-[10px] h-4 flex items-center">Partner</div>
                                </ExtendedButton>
                            </div>
                        </div>
                        <div className="flex justify-center w-fit">
                            <ExtendedButton
                                disabled={!(authenticated && allDataLoaded)}
                                size="lg"
                                className="text-background"
                                onClick={() => router.push(pathConstants.play)}
                            >
                        Play
                            </ExtendedButton>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <div className="flex flex-1 grid place-items-center">
                                <ExtendedButton
                                    variant="ghost"
                                    className="flex-1 flex flex-col items-center justify-center h-full"
                                    onClick={() => router.push(pathConstants.dapp)}
                                >
                                    <BlocksIcon className="w-5 h-5 min-w-5 min-h-5" />
                                    <div className="text-[10px] h-4 flex items-center">
                            DApps
                                    </div>
                                </ExtendedButton>
                            </div>
                            <div className="flex flex-1 grid place-items-center">
                                <ExtendedButton
                                    variant="ghost"
                                    className="flex-1 flex flex-col items-center justify-center h-full"
                                >
                                    <TwitterIcon className="w-5 h-5 min-w-5 min-h-5" />
                                    <div className="text-[10px] h-4 flex items-center">
                            Social
                                    </div>
                                </ExtendedButton>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </>
    ) 
}
