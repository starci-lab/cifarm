"use client"

import React, { FC } from "react"
import { Container } from "@/components"
import dynamic from "next/dynamic"

const Game = dynamic(() => import("@/game"), {
    ssr: false,
})

const Page : FC = () => {
    return (
        <Container>
            <Game />
        </Container>
    )
}

export default Page