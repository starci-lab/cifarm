"use client"
import { Container } from "@/components"
import React, { FC } from "react"
import { Navbar } from "./Navbar"
import { BottomNavbar } from "./BottomNavbar"
import { Market } from "./Market"
import { UpcomingEvents } from "./UpcomingEvents"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

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
                        <Avatar className="absolute left-4 -bottom-8 z-20 w-28 h-28 ring-0">
                            <AvatarImage src="/logo.png" alt="Logo" />
                        </Avatar>
                    </div>
                    <div className="h-10" />
                    <div className="px-4">
                        <div className="text-2xl font-bold">CiFarm</div>
                        <Badge variant="default" className="border-0 px-0 bg-green-500 hover:bg-green-600">
                            1 playings
                        </Badge>
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
