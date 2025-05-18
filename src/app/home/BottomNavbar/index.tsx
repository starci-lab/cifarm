"use client"

import { SHEET_BOTTOM_NAV_DISCLOSURE } from "@/app/constants"
import { ExtendedButton } from "@/components"
import { pathConstants } from "@/constants"
import {
    useRouterWithSearchParams
} from "@/hooks"
import { useIsMobile } from "@/hooks/useIsMobile"
import { cn } from "@/lib/utils"
import { useSingletonHook } from "@/modules/singleton-hook"
import { Coins, Cube, DiscordLogo, DotsThree,  GameController,  House, XLogo } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { useDisclosure } from "react-use-disclosure"
import { usePathname } from "next/navigation"
import React, { FC, useState } from "react"
import { setBottomNavSheet, useAppDispatch } from "@/redux"

interface NavItem {
    name: string
    icon: React.ElementType
    path?: string
    items?: NavItem[]
}

export const BottomNavbar: FC = () => {
    const router = useRouterWithSearchParams()
    const isMobile = useIsMobile()
    const pathname = usePathname()
    const { open: openBottomNavSheet } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_BOTTOM_NAV_DISCLOSURE
    )
    const dispatch = useAppDispatch()

    const navItems: NavItem[] = [
        {
            name: "Home",
            icon: House,
            path: pathConstants.home,
        },
        {
            name: "Assets",
            icon: Coins,
            path: `${pathConstants.home}${pathConstants.assets}`,
        },
        {
            name: "DApps",
            icon: Cube,
            path: `${pathConstants.home}${pathConstants.dapps}`,
        },
        {
            name: "More",
            icon: DotsThree,
            items: [
                {
                    name: "Twitter",
                    icon: XLogo,
                    path: "https://x.com/CifarmOnSol",
                },
                {
                    name: "Quick play",
                    icon: GameController,
                    path: "/play",
                },
            ]
        },
    ]

    const handleNavClick = (item: NavItem) => {
        if (item.items) {
            openBottomNavSheet()
            dispatch(setBottomNavSheet({
                items: item.items.map((item) => ({
                    name: item.name,
                    icon: item.icon,
                    path: item.path || "/",
                })),
            }))
        } else if (item.path) {
            router.push(item.path)
        }
    }

    return (
        <>
            {isMobile && (
                <div className="m-auto fixed top-auto bottom-0 border-t z-50 w-full bg-background h-[60px] md:h-16 safe-area-pb">
                    <nav className="m-auto w-full h-full flex items-center justify-between px-2 sm:px-4">
                        <ul className="h-full grid grid-cols-4 gap-1 w-full">
                            {navItems.map((item) => {
                                const isActive = pathname === item.path

                                return (
                                    <li key={item.name} className="relative">
                                        <button
                                            onClick={() => handleNavClick(item)}
                                            className={cn(
                                                "w-full h-full flex flex-col items-center justify-center transition-all duration-200",
                                                isActive ? "text-secondary" : "text-muted-foreground hover:text-foreground",
                                            )}
                                        >
                                            <ExtendedButton 
                                                className="relative group" 
                                                variant="flat" 
                                                color="ghost"
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeIndicator"
                                                        className="absolute -inset-1 bg-secondary/10 rounded-full"
                                                        initial={false}
                                                        transition={{ type: "spring", duration: 0.5 }}
                                                    />
                                                )}
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <item.icon className="w-8 h-8 relative" />
                                                </motion.div>
                                            </ExtendedButton>
                                            <span className="text-[14px] font-medium -mt-1">{item.name}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            )}
        </>
    ) 
}
