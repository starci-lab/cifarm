import React, { PropsWithChildren } from "react"
import { SolanaWalletAdapterProvider } from "./solana-wallet-deeplink"

export const MobileCallbacks = ({ children }: PropsWithChildren) => {
    return (
        <SolanaWalletAdapterProvider>
            {children}
        </SolanaWalletAdapterProvider>
    )
}