"use client"
import React from "react"
import { SolanaDApps } from "./SolanaDApps"
import { useAppSelector } from "@/redux"
import { ChainKey } from "@/modules/blockchain"
import { Header, Spacer } from "@/components"
import { ChainSelectionDropdown } from "../assets/ChainSelectionDropdown"
const Page = () => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const renderContent = () => {
        switch (chainKey) {
        case ChainKey.Solana:
            return <SolanaDApps />
        }
    }   
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <Header title="DApps" />
                <ChainSelectionDropdown />
            </div>
            <Spacer y={6} />
            {renderContent()}
        </div>
    )
}

export default Page
