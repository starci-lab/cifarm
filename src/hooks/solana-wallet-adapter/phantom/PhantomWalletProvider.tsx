import React, { FC, PropsWithChildren } from "react"
import { usePhantomWalletActions } from "./usePhantomWalletActions"
import { usePhantomWalletStates } from "./usePhantomWalletStates"
import { usePhantomWalletCallbacks } from "./usePhantomWalletCallbacks"

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