"use client"

import React, { FC } from "react"
import { UserDropdown } from "./UserDropdown"
import { ConnectButton } from "./ConnectButton"

export const Navbar: FC = () => {
    return (
        <nav className="w-full py-4 z-50 sticky top-0 px-6">
            <div className="flex items-center justify-between w-full">
                <div/>
                <div className="flex items-center gap-2">
                    <ConnectButton />
                    <UserDropdown />
                </div>
            </div>
        </nav>
    )
}
