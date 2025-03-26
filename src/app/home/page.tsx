"use client"
import { Avatar, AvatarImage, Container } from "@/components"
import React, { FC } from "react"
import { Navbar } from "./Navbar"
import { BottomNavbar } from "./BottomNavbar"
import Image from "next/image"
import { Market } from "./Market"
import { UpcomingEvents } from "./UpcomingEvents"

const Page: FC = () => {
    return (
        <Container>
            <div className="h-full">
                <Navbar />
                <div className="relative -top-[4rem]">
                    <Image 
                        src="/background.png" 
                        alt="Background"
                        width={1920}
                        height={1080}
                        className="w-full"
                    />
                    <div className="relative">
                        <Avatar className="absolute left-4 -bottom-8 z-20 w-28 h-28 ring-4 ring-background">
                            <AvatarImage src="/logo.png" alt="Logo" />
                        </Avatar>
                    </div>
                    <div className="h-10" />
                    <div className="px-4">
                        <div className="text-2xl font-bold">CiFarm</div>
                        <div className="h-6" />
                        <Market />
                        <div className="h-6" />
                        <UpcomingEvents />
                    </div>
                </div>
                <BottomNavbar />
            </div>
        </Container>
    )
}

export default Page
