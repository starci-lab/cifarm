"use client"

import React, { FC } from "react"
import { UserDropdown } from "./UserDropdown"
import { ConnectButton } from "./ConnectButton"
import { useAppSelector } from "@/redux"
import { ExtendedButton } from "@/components"
import { useRouterWithSearchParams } from "@/hooks"

export const Navbar: FC = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    const router = useRouterWithSearchParams()

    return (
        <nav className="w-full py-4 z-50 sticky top-0 px-6">
            <div className="flex items-center justify-between w-full">
                <div/>
                <div className="flex items-center gap-2">
                    {
                        user ? (
                            <>
                                <ConnectButton />
                                <UserDropdown />
                            </>
                        ) : (
                            <ExtendedButton color="primary"
                                onClick={() => {
                                    router.push("/sign-in")
                                }}
                            >
                                    Login
                            </ExtendedButton>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}
