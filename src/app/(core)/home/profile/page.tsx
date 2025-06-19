"use client"

import {
    BlurEffect,
    Header,
    Spacer,
} from "@/components"
import React from "react"
import { DisplayInfomation } from "./DisplayInfomation"

const Page = () => {
    return (
        <div className="relativen">
            <BlurEffect size="lg" position="top" />
            <Header title="Profile" />
            <Spacer y={6} />
            <DisplayInfomation />   
        </div>
    )
}

export default Page
