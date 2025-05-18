"use client"
import React from "react"
import { SolanaDApps } from "./SolanaDApps"
import { useAppSelector } from "@/redux"
import { ChainKey } from "@/modules/blockchain"
import { Header, Spacer, BlurEffect } from "@/components"
const Page = () => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const renderContent = () => {
        switch (chainKey) {
        case ChainKey.Solana:
            return <SolanaDApps />
        }
    }   
    return (
        <div className="relative">
            <BlurEffect size="lg" position="top" className="-z-10" />
            <Header title="DApps" />
            <Spacer y={6} />
            {renderContent()}
        </div>
    )
}

export default Page
