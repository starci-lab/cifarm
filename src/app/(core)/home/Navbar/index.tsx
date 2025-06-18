"use client"

import React, { FC } from "react"
import { UserDropdown } from "./UserDropdown"
import { ConnectButton } from "./ConnectButton"
import { useAppSelector } from "@/redux"
import { Skeleton, ToggleThemeButton } from "@/components"
import { useTheme } from "next-themes"

export const Navbar: FC = () => {
    const user = useAppSelector((state) => state.apiReducer.coreApi.user)
    const { theme, setTheme } = useTheme()
    return (
        <nav className="w-full py-4 z-50 sticky top-0 px-6 max-w-[1200px] mx-auto">
            <div className="absolute inset-0 bg-opacity-95 backdrop-blur-sm z-0"></div>
            <div className="flex items-center justify-between w-full">
                <div/>
                <div className="flex items-center gap-2 justify-between w-full">
                    {
                        user ? (
                            <>
                                <ConnectButton />
                                <div className="flex items-center gap-2">
                                    <ToggleThemeButton setTheme={setTheme} theme={theme || "dark"} />
                                    <UserDropdown />
                                </div>
                            </>
                        ) : (
                            <>
                                <Skeleton className="w-24 h-10 rounded-lg z-20" />
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-10 h-10 rounded-lg z-20" />
                                    <Skeleton className="w-10 h-10 rounded-lg z-20" />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}
