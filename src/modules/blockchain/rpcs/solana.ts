import { Network } from "../common"
import { Cluster, Connection, clusterApiUrl } from "@solana/web3.js"

const networkMap: Record<Network, Cluster> = {
    [Network.Mainnet]: "mainnet-beta",
    [Network.Testnet]: "devnet",
}

export const solanaClient = (network: Network = Network.Testnet) => {
    return new Connection(clusterApiUrl(networkMap[network]), {
        commitment: "confirmed",
    })
}

export const _solanaHttpRpcUrl = (network: Network) => {
    let rpcUrl = ""
    switch (network) {
    case Network.Mainnet: {
        rpcUrl = clusterApiUrl("mainnet-beta")
        break
    }
    case Network.Testnet: {
        rpcUrl = clusterApiUrl("devnet")
        break
    }
    }
    return rpcUrl
}
