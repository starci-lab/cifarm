"use client"
import { PhantomWalletProvider } from "@/hooks/solana-wallet-adapter/phantom/PhantomWalletProvider"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import React from "react"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReduxProvider store={store}>
            <PhantomWalletProvider>
                {children}
            </PhantomWalletProvider>
        </ReduxProvider>
    )
}

export default RootLayout