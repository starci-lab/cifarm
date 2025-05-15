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
import { useIsMobile } from "@/hooks/useIsMobile"
import { Coins, Cube, GameController, Gift, XLogo } from "@phosphor-icons/react"

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
                <div className="m-auto fixed top-auto bottom-0 border-t z-50 w-full bg-background h-[60px] md:h-16 safe-area-pb">
                    <nav className="m-auto w-full h-full flex items-center justify-between px-2 sm:px-4">
                        <div className="flex-1 flex justify-between max-w-[40%]">
                            <div className="flex flex-1 grid place-items-center">
                                <ExtendedButton
                                    color="secondary"
                                    variant="ghost"
                                    classNames={{
                                        container: "flex-1 flex flex-col items-center justify-center h-full gap-0.5 w-fit"
                                    }}
                                    onClick={() => router.push(pathConstants.assets)}
                                >
                                    <Coins className="w-4 h-4 sm:w-5 sm:h-5 min-w-4 min-h-4" />
                                    <div className="text-[9px] sm:text-[10px] h-3 sm:h-4 flex items-center">Assets</div>
                                </ExtendedButton>
                            </div>
                            <div className="flex flex-1 grid place-items-center">
                                <ExtendedButton
                                    color="secondary"
                                    variant="ghost"
                                    classNames={{
                                        container: "flex-1 flex flex-col items-center justify-center h-full gap-0.5 w-fit"
                                    }}
                                    onClick={() => router.push(pathConstants.partnerships)}
                                >
                                    <Gift className="w-4 h-4 sm:w-5 sm:h-5 min-h-4 min-w-4" />
                                    <div className="text-[9px] sm:text-[10px] h-3 sm:h-4 flex items-center">Partner</div>
                                </ExtendedButton>
                            </div>
                        </div>
                        <div className="flex justify-center w-fit">
                            <ExtendedButton
                                disabled={!(authenticated && allDataLoaded)}
                                size="lg"
                                color="primary"
                                classNames={{
                                    container: "text-background text-sm sm:text-base px-4 sm:px-6"
                                }}
                                onClick={() => router.push(pathConstants.play)}
                            >
                                <GameController className="w-4 h-4 sm:w-5 sm:h-5 min-w-4 min-h-4" />
                                Play
                            </ExtendedButton>
                        </div>
                        <div className="flex-1 flex justify-end max-w-[40%]">
                            <div className="flex flex-1 grid place-items-center">
                                <ExtendedButton
                                    color="secondary"
                                    variant="ghost"
                                    classNames={{
                                        container: "flex-1 flex flex-col items-center justify-center h-full gap-0.5 w-fit"
                                    }}
                                    onClick={() => router.push(pathConstants.dapp)}
                                >
                                    <Cube className="w-4 h-4 sm:w-5 sm:h-5 min-w-4 min-h-4" />
                                    <div className="text-[9px] sm:text-[10px] h-3 sm:h-4 flex items-center">
                                        DApps
                                    </div>
                                </ExtendedButton>
                            </div>
                            <div className="flex flex-1 grid place-items-center">
                                <ExtendedButton
                                    color="secondary"
                                    variant="ghost"
                                    classNames={{
                                        container: "flex-1 flex flex-col items-center justify-center h-full gap-0.5 w-fit"
                                    }}
                                >
                                    <XLogo className="w-4 h-4 sm:w-5 sm:h-5 min-w-4 min-h-4" />
                                    <div className="text-[9px] sm:text-[10px] h-3 sm:h-4 flex items-center">
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
