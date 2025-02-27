"use client"
import { Container } from "@/components"
import React, { FC } from "react"
import { Navbar } from "./Navbar"
import { Avatar, Chip, Image, Spacer } from "@heroui/react"
import { BottomNavbar } from "./BottomNavbar"
import { Market } from "./Market"
import { UpcomingEvents } from "./UpcomingEvents"

const Page: FC = () => {
    return (
        <Container>
            <div className="h-full">
                <Navbar />
                <div className="relative -top-[4rem]">
                    <Image src="/background.png" radius="none" />
                    <div className="relative">
                        <Avatar
                            className="absolute left-4 -bottom-8 z-20"
                            isBordered
                            src="/logo.png"
                            radius="full"
                            classNames={{
                                base: "ring-0 w-28 h-28",
                            }}
                        />
                    </div>
                    <Spacer y={10} />
                    <div className="px-4">
                        <div className="text-2xl font-bold">CiFarm</div>
                        <Chip
                            classNames={{
                                base: "border-0 px-0",
                            }}
                            color="success"
                            variant="dot"
                        >
              1 playings
                        </Chip>
                        <Spacer y={6} />
                        <Market />
                        <Spacer y={6} />
                        <UpcomingEvents />
                    </div>
                </div>
                <BottomNavbar />
            </div>
        </Container>
    )
}

export default Page
