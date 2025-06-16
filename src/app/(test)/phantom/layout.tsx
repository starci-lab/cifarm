"use client"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import React from "react"
import { SolanaWalletAdapterProvider } from "@/hooks"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReduxProvider store={store}>
            <SolanaWalletAdapterProvider>
                {children}
            </SolanaWalletAdapterProvider>
        </ReduxProvider>
    )
}

export default RootLayout