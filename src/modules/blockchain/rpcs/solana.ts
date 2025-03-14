import { Network } from "../common"
import { Connection, clusterApiUrl } from "@solana/web3.js"

export const solanaClient = (network: Network = Network.Testnet) => {
    const rpcUrl = _solanaHttpRpcUrl(network)
    return new Connection(rpcUrl, {
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
        // we use honeycomb testnet for now, instead of devnet  
        rpcUrl = "https://rpc.test.honeycombprotocol.com"
        //rpcUrl = clusterApiUrl("devnet")
        break
    }
    }
    return rpcUrl
}
