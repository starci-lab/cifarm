"use client"
import React, { FC, PropsWithChildren } from "react"
import { Navbar } from "./Navbar"
import { BottomNavbar } from "./BottomNavbar"
import { AppSidebar } from "./AppSidebar"
import { Container } from "@/components"

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Container>
            <div className="h-full w-full">
                <div className="flex">  
                    <AppSidebar />
                    <div className="flex-1">
                        <Navbar />
                        <div className="px-6 py-4 max-w-[1200px] mx-auto">
                            {children}
                        </div>
                        <BottomNavbar />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Layout
