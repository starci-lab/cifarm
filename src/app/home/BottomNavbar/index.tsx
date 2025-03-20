"use client"

import React, { FC } from "react"
import {
    Button,
    Navbar as HeroUiNavbar,
    Link,
    NavbarContent,
} from "@heroui/react"
import {
    BuildingStorefrontIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline"
import { CiGift } from "react-icons/ci"
import { RiTwitterXLine } from "react-icons/ri"
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
            <HeroUiNavbar
                isBlurred={false}
                classNames={{
                    base: "m-auto w-full",
                }}
            >
                <NavbarContent justify="start">
                    <Link
                        as="button"
                        onPress={() => router.push(pathConstants.profile)}
                        className="flex-1"
                        color="foreground"
                    >
                        <div className="grid place-items-center">
                            <UserCircleIcon className="w-6 h-6" />
                            <div className="text-[10px] h-4 flex items-center">Profile</div>
                        </div>
                    </Link>
                    <Link
                        as="button"
                        onPress={() => router.push(pathConstants.partnerships)}
                        className="flex-1 flex justify-end"
                        color="foreground"
                    >
                        <div className="grid place-items-center">
                            <CiGift className="w-6 h-6" />
                            <div className="text-[10px] h-4 flex items-center">
                Partnerships
                            </div>
                        </div>
                    </Link>
                </NavbarContent>
                <NavbarContent justify="center">
                    <Button
                        isDisabled={!(authenticated && allDataLoaded)}
                        size="lg"
                        color="primary"
                        className="light text-background"
                        onPress={() => router.push(pathConstants.play)}
                    >
            Play
                    </Button>
                </NavbarContent>
                <NavbarContent justify="end">
                    <Link as="button" className="flex-1" color="foreground">
                        <div className="grid place-items-center">
                            <BuildingStorefrontIcon className="w-6 h-6" strokeWidth={1} />
                            <div className="text-[10px] h-4 flex items-center">
                Marketplace
                            </div>
                        </div>
                    </Link>
                    <Link
                        as="button"
                        className="flex-1 flex justify-end"
                        color="foreground"
                    >
                        <div className="grid place-items-center">
                            <RiTwitterXLine className="w-6 h-6" />
                            <div className="text-[10px] h-4 flex items-center">Social</div>
                        </div>
                    </Link>
                </NavbarContent>
            </HeroUiNavbar>
        </div>
    )
}
