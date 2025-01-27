import { ChainKey, Network } from "./common"

export const blockchainMap: Record<ChainKey, BlockchainInfo> = {
    [ChainKey.Solana]: {
        imageUrl: "/solana.svg",
        name: "Solana",
    },
    [ChainKey.Sui]: {
        imageUrl: "/sui.svg",
        name: "SUI",
    }
}

export const networkMap: Record<Network, NetworkInfo> = {
    [Network.Mainnet]: {
        name: "Mainnet",
    },
    [Network.Testnet]: {
        name: "Testnet",
    }
}

export interface BlockchainInfo {
    imageUrl: string
    name: string
}

export interface NetworkInfo {
    name: string
}