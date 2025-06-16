"use client"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import React, { PropsWithChildren, Suspense } from "react"
import { SolanaWalletAdapterProvider } from "@/hooks"

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <Suspense>
            <ReduxProvider store={store}>
                <SolanaWalletAdapterProvider>
                    {children}
                </SolanaWalletAdapterProvider>
            </ReduxProvider>
        </Suspense>
    )
}

export default Layout