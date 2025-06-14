import { PropsWithChildren } from "react"
import { Network } from "../../modules/blockchain"
import React, { FC } from "react"
import { Wallet } from "@solana/wallet-adapter-react"

const SolanaWalletAdapterContext = React.createContext<Wallet | null>(null)

export const SolanaWalletAdapterProvider: FC<SolanaWalletAdapterProps> = ({ children, network }) => {
    console.log(network)
    return (
        <SolanaWalletAdapterContext.Provider value={null}>
            {children}
        </SolanaWalletAdapterContext.Provider>
    )
}

export const SolanaWalletAdapter = ({
    children,
    network
}: SolanaWalletAdapterProps) => {
    console.log(network)
    return (<SolanaWalletAdapterContext.Provider value={null}>
        {children}
    </SolanaWalletAdapterContext.Provider>
    )
}

export interface SolanaWalletAdapterProps extends PropsWithChildren {
    network: Network;
}