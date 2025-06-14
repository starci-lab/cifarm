import React, { FC, PropsWithChildren } from "react"
import { usePhantomWalletActions } from "./usePhantomWalletActions"
import { usePhantomWalletStates } from "./usePhantomWalletStates"
import { usePhantomWalletCallbacks } from "./usePhantomWalletCallbacks"

// PhantomConnectData
export interface PhantomConnectData {
    public_key: string
    session: string
}

// PhantomWalletProvider
export const PhantomWalletProvider: FC<PropsWithChildren> = ({ children }) => {
    // states
    usePhantomWalletStates()
    usePhantomWalletActions()
    usePhantomWalletCallbacks()

    return (
        <>
            {children}
        </>
    )
}