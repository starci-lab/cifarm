"use client"

import React, { FC, PropsWithChildren } from "react"
const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            {
                children
            }
        </>
    )
}

export default Layout
