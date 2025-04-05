"use client"
import { Container } from "@/components"
import React, { FC, PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Container hasPadding>
            <div className="flex flex-col justify-between gap-6">
                {children}   
            </div>
        </Container>
    )
}

export default Layout
