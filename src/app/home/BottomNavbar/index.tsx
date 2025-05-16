"use client"

import { ExtendedButton } from "@/components"
import { pathConstants } from "@/constants"
import {
    useRouterWithSearchParams
} from "@/hooks"
import { useIsMobile } from "@/hooks/useIsMobile"
import { cn } from "@/lib/utils"
import { Coins, Cube, Gift, XLogo } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import React, { FC } from "react"

export const BottomNavbar: FC = () => {
    const router = useRouterWithSearchParams()
    const isMobile = useIsMobile()
    const pathname = usePathname()
    const navItems = [
        {
            name: "Assets",
            icon: Coins,
            path: pathConstants.assets,
        },
        {
            name: "Partner",
            icon: Gift,
            path: pathConstants.partnerships,
        },
        {
            name: "DApps",
            icon: Cube,
            path: pathConstants.dapp,
        },
        {
            name: "Social",
            icon: XLogo,
            path: "#",
        },
    ]

    return (
        <>
            {isMobile && (
                <div className="m-auto fixed top-auto bottom-0 border-t z-50 w-full bg-background h-[60px] md:h-16 safe-area-pb">
                    <nav className="m-auto w-full h-full flex items-center justify-between px-2 sm:px-4">
                        <ul className="h-full grid grid-cols-4 gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.path

                                return (
                                    <li key={item.name} className="relative">
                                        <button
                                            onClick={() => router.push(item.path)}
                                            className={cn(
                                                "w-full h-full flex flex-col items-center justify-center gap-1 transition-colors",
                                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                                            )}
                                        >
                                            <div className="relative">
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeIndicator"
                                                        className="absolute -inset-1 bg-primary/10 rounded-full"
                                                        initial={false}
                                                        transition={{ type: "spring", duration: 0.5 }}
                                                    />
                                                )}
                                                <item.icon className="w-5 h-5 relative" />
                                            </div>
                                            <span className="text-[10px] font-medium">{item.name}</span>
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
