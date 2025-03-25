"use client"

import React, { FC } from "react"
import {
    BuildingStorefrontIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline"
import { CiGift } from "react-icons/ci"
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
import { Button } from "@/components/ui/button"

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
        <div className="m-auto fixed top-auto bottom-0 border-t h-16 z-50 max-w-[500px] w-full">
            <nav className="m-auto w-full h-full flex items-center justify-between px-4">
                <div className="flex-1 flex justify-between">
                    <Button
                        variant="ghost"
                        className="flex-1 flex flex-col items-center justify-center h-full"
                        onClick={() => router.push(pathConstants.profile)}
                    >
                        <UserCircleIcon className="w-6 h-6" />
                        <div className="text-[10px] h-4 flex items-center">Profile</div>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex-1 flex flex-col items-center justify-center h-full"
                        onClick={() => router.push(pathConstants.partnerships)}
                    >
                        <CiGift className="w-6 h-6" />
                        <div className="text-[10px] h-4 flex items-center">
                            Partnerships
                        </div>
                    </Button>
                </div>
                <div className="flex-1 flex justify-center">
                    <Button
                        disabled={!(authenticated && allDataLoaded)}
                        size="lg"
                        className="text-background"
                        onClick={() => router.push(pathConstants.play)}
                    >
                        Play
                    </Button>
                </div>
                <div className="flex-1 flex justify-end">
                    <Button
                        variant="ghost"
                        className="flex-1 flex flex-col items-center justify-center h-full"
                    >
                        <BuildingStorefrontIcon className="w-6 h-6" strokeWidth={1} />
                        <div className="text-[10px] h-4 flex items-center">
                            Marketplace
                        </div>
                    </Button>
                </div>
            </nav>
        </div>
    )
}
