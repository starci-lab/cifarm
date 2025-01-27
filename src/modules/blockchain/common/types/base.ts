import { Chain } from "@wormhole-foundation/sdk"

export enum ChainKey {
  Solana = "solana",
  Sui = "sui",
}

export enum Network {
  Testnet = "testnet",
  Mainnet = "mainnet",
}

export enum Platform {
  Solana = "solana",
  Sui = "sui",
}

export interface ChainAccount {
  address: string;
  privateKey: string;
  publicKey: string;
}

export const chainKeyToChain = (chainKey: string): Chain => {
    switch (chainKey) {
    case ChainKey.Solana:
        return "Solana"
    case ChainKey.Sui:
        return "Sui"
    default:
        throw new Error(`Chain not found : ${chainKey}`)
    }
}

export const chainToChainKey = (chainKey: Chain): string => {
    switch (chainKey) {
    case "Solana":
        return ChainKey.Solana
    case "Sui":
        return ChainKey.Sui
    default:
        throw new Error(`Chain not found : ${chainKey}`)
    }
}
