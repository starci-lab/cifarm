"use client"
import React from "react"
import { DApps } from "./DApps"
import { Header, Spacer, BlurEffect } from "@/components"

const Page = () => {
    return (
        <div className="relative">
            <BlurEffect size="lg" position="top" className="-z-10" />
            <Header title="DApps" />
            <Spacer y={6} />
            <DApps />
        </div>
    )
}

export default Page
