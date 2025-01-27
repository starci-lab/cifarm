import { ChainKey, Network, Platform } from "../types/base"
import { Network as WormholeNetwork } from "@wormhole-foundation/sdk"

export const chainKeyToPlatform = (chainKey: string): Platform => {
    switch (chainKey) {
    case ChainKey.Solana: return Platform.Solana
    case ChainKey.Sui: return Platform.Sui
    default:
        throw new Error(`Chain not supported: ${chainKey}`)
    }
}

export const parseNetwork = (network: Network): WormholeNetwork => {
    switch (network) {
    case Network.Mainnet:
        return "Mainnet"
    case Network.Testnet:
        return "Testnet"
    default:
        throw new Error(`Network not supported: ${network}`)
    }
}

export const parseWormholeNetwork = (network: WormholeNetwork): Network => {
    switch (network) {
    case "Mainnet":
        return Network.Mainnet
    case "Testnet":
        return Network.Testnet
    default:
        throw new Error(`Network not supported: ${network}`)
    }
}