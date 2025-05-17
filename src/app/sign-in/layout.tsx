"use client"

import React, { FC, PropsWithChildren } from "react"
import { useAppSelector } from "@/redux"
import { AuthenticatedScene } from "@/components"
const Layout: FC<PropsWithChildren> = ({ children }) => {
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    return (
        <>
            {
                authenticated ? (
                    <AuthenticatedScene />
                ) : (
                    children
                )
            }
        </>
    )
}

export default Layout
