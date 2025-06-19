import { ChainKey, Network } from "../common"
import { clusterApiUrl, Commitment, Connection } from "@solana/web3.js" 

export const solanaClient = ({
    chainKey,
    network,
    commitment,
}: SolanaClientParams) => {
    const rpcUrl = solanaHttpRpcUrl({
        chainKey: chainKey,
        network: network,
    })
    return new Connection(rpcUrl, {
        commitment: commitment || "confirmed",
    })
}

export const solanaHttpRpcUrl = ({
    chainKey,
    network,
}: SolanaHttpRpcUrlParams) => {
    let rpcUrl = ""
    switch (network) {
    case Network.Mainnet: {
        switch (chainKey) {
        case ChainKey.Solana:
            rpcUrl = "https://mainnet.helius-rpc.com/?api-key=195f7f46-73d5-46df-989e-9d743bf3caad"
            //rpcUrl = "https://solana-mainnet.g.alchemy.com/v2/kl2gvTqryb4y709GQZgi_"
            //clusterApiUrl("mainnet-beta")
            break
        default:
            throw new Error(`Unsupported chain key: ${chainKey}`)
        }
        break
    }
    case Network.Testnet: {
        switch (chainKey) {
        case ChainKey.Solana:
            //rpcUrl = "https://devnet.helius-rpc.com/?api-key=195f7f46-73d5-46df-989e-9d743bf3caad"
            rpcUrl = clusterApiUrl("devnet")
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
  chainKey: ChainKey;
  network: Network;
}

export type SolanaClientParams = SolanaHttpRpcUrlParams & {
  commitment?: Commitment;
};