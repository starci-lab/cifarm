"use client"
import React, { FC } from "react"
import { Navbar } from "./Navbar"
import { BottomNavbar } from "./BottomNavbar"
import { AppSidebar } from "./AppSidebar"
import { Container, ExtendedButton, Header, Image, Spacer } from "@/components"

const Page: FC = () => {
    return (
        <Container>
            <div className="h-full w-full">
                <div className="flex">  
                    <AppSidebar />
                    <div className="flex-1">
                        <Navbar />
                        <div className="px-6 py-4">
                            <Header title="Home" />
                            <Spacer y={6}/>
                            <Image src="/background.png" alt="Home" className="w-full rounded-lg" />
                            <Spacer y={4}/>
                            <div className="flex items-center gap-2">
                                <ExtendedButton>
                                    Play Now
                                </ExtendedButton>
                                <div className="text-sm text-muted-foreground">
                                    5 playings
                                </div>
                            </div>
                        </div>
                        <BottomNavbar />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Page
