import { PropsWithChildren } from "react"
import React, { FC } from "react"
import { PhantomWalletProvider } from "./phantom"

export const SolanaWalletAdapterProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <PhantomWalletProvider>
                {children}
            </PhantomWalletProvider>
        </>
    )
}
