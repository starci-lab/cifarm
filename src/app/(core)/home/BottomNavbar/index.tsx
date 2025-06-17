"use client"

import { SHEET_BOTTOM_NAV_DISCLOSURE } from "@/app/(core)/constantsd"
import { pathConstants } from "@/constants"
import {
    useRouterWithSearchParams
} from "@/hooks"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useSingletonHook } from "@/singleton"
import { Coins, Cube, DotsThree,  GameController,  Plant,  SquaresFour, XLogo } from "@phosphor-icons/react"
import { useDisclosure } from "react-use-disclosure"
import { usePathname } from "next/navigation"
import React, { FC, ReactNode } from "react"
import { Selection } from "./Selection"
import { Button } from "@/components"

interface NavItem {
    name: string
    icon: ReactNode
    path?: string
    items?: Array<NavItem>
}

export const BottomNavbar: FC = () => {
    const router = useRouterWithSearchParams()
    const isMobile = useIsMobile()
    const pathname = usePathname()
    const { open: openBottomNavSheet } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_BOTTOM_NAV_DISCLOSURE
    )
    const navItems: Array<NavItem> = [
        {
            name: "Home",
            icon: <SquaresFour className="w-6 h-6 relative" />,
            path: pathConstants.home,
        },
        {
            name: "Assets",
            icon: <Coins className="w-6 h-6 relative" />,
            path: `${pathConstants.home}${pathConstants.assets}`,
        },
        {
            name: "DApps",
            icon: <Cube className="w-6 h-6 relative" />,
            path: `${pathConstants.home}${pathConstants.dapps}`,
        },
        {
            name: "More",
            icon: <DotsThree className="w-6 h-6 relative" />,
            items: [
                {
                    name: "Twitter",
                    icon: <XLogo className="w-6 h-6 relative" />,
                    path: "https://x.com/CifarmOnSol",
                },
                {
                    name: "Quick play",
                    icon: <GameController className="w-6 h-6 relative" />,
                    path: "/play",
                },
            ],
        },
    ]

    const onItemClick = (item: NavItem) => {
        if (item.items) {
            openBottomNavSheet()
        } else if (item.path) {
            router.push(item.path)
        }
    }

    return (
        <>
            {isMobile && (
                <nav className="fixed left-0 bottom-0 border-t border-border z-50 w-full bg-content-4">
                    <div className="flex gap-2 w-full justify-between items-center py-2 px-6">
                        <Selection
                            name={navItems[0].name}
                            icon={navItems[0].icon}
                            selected={pathname === navItems[0].path}
                            onClick={() => onItemClick(navItems[0])}
                        />
                        <Selection
                            name={navItems[1].name}
                            icon={navItems[1].icon}
                            selected={pathname === navItems[1].path}
                            onClick={() => onItemClick(navItems[1])}
                        />
                        <div className="w-10 relative">
                            <Button
                                onClick={() => router.push(pathConstants.play)}
                                color="primary" className="scale-150 rounded-full absolute bottom-2 shadow-lg left-1/2 -translate-x-1/2" size="icon">
                                <Plant />
                            </Button>
                        </div>
                        <Selection
                            name={navItems[2].name}
                            icon={navItems[2].icon}
                            selected={pathname === navItems[2].path}
                            onClick={() => onItemClick(navItems[2])}
                        />
                        <Selection
                            name={navItems[3].name}
                            icon={navItems[3].icon}
                            selected={pathname === navItems[3].path}
                            onClick={() => onItemClick(navItems[3])}
                        />
                    </div>
                </nav>
            )}
        </>
    ) 
}
