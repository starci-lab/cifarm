import { ChainKey, Network } from "../common"
import { Commitment, Connection, clusterApiUrl } from "@solana/web3.js"

export const solanaClient = ({chainKey, network, commitment}: SolanaClientParams) => {
    const rpcUrl = solanaHttpRpcUrl({
        chainKey: chainKey,
        network: network
    })
    return new Connection(rpcUrl, {
        commitment: commitment || "confirmed",
    })
}

export const solanaHttpRpcUrl = ({chainKey, network}: SolanaHttpRpcUrlParams) => {
    let rpcUrl = ""
    switch (network) {
    case Network.Mainnet: {
        switch (chainKey) {
        case ChainKey.Solana:
            rpcUrl = clusterApiUrl("mainnet-beta")
            break
        default:
            throw new Error(`Unsupported chain key: ${chainKey}`)
        }
        break
    }
    case Network.Testnet: {
        switch (chainKey) {
        case ChainKey.Solana:
            // we use honeycomb testnet for now, instead of devnet  
            rpcUrl = clusterApiUrl("devnet")
            //rpcUrl = clusterApiUrl("devnet")
            break
        default:
            throw new Error(`Unsupported chain key: ${chainKey}`)
        }
        break
    }
    }
    return rpcUrl
}

export interface SolanaHttpRpcUrlParams {
    chainKey: ChainKey
    network: Network
}

export type SolanaClientParams = SolanaHttpRpcUrlParams & {
    commitment?: Commitment
}
