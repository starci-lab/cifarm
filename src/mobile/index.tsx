import React, { PropsWithChildren } from "react"
import { SolanaWalletAdapterProvider } from "./solana-wallet-deeplink"
import { useMobileCallbacks } from "./useMobileCallbacks"

export * from "./solana-wallet-deeplink"

export const MobileCallbacks = ({ children }: PropsWithChildren) => {
    return (
        <SolanaWalletAdapterProvider>
            {children}
            <UseMobileCallbacks />
        </SolanaWalletAdapterProvider>
    )
}

export const UseMobileCallbacks = () => {
    useMobileCallbacks()    
    return null
}