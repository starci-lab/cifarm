"use client"

import React, { FC } from "react"
import dynamic from "next/dynamic"
const Game = dynamic(() => import("@/game"), {
    ssr: false,
})

const Page : FC = () => {
    return (
        <Game />
    )
}

export default Page