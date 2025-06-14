"use client"
import React, { FC, PropsWithChildren } from "react"
import { Navbar } from "./Navbar"
import { BottomNavbar } from "./BottomNavbar"
import { AppSidebar } from "./AppSidebar"
import { Container } from "@/components"
import { useIsMobile } from "@/hooks"
const Layout: FC<PropsWithChildren> = ({ children }) => {
    const isMobile = useIsMobile()
    return (
        <Container>
            <div className="h-full w-full">
                <div className="flex">  
                    <AppSidebar />
                    <div className="flex-1">
                        <Navbar />
                        <div className="py-4 px-6 max-w-[1200px] mx-auto w-full">
                            {children}
                        </div>
                        {
                            isMobile && (
                                <div className="h-24"/>
                            )
                        }
                        <BottomNavbar />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Layout
