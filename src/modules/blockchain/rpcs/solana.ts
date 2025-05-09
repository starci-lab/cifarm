import { ChainKey, Network } from "../common"
import { Commitment, Connection, clusterApiUrl } from "@solana/web3.js"
import { signerIdentity } from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox"
import { WalletAdapter } from "@solana/wallet-adapter-base"
import { mplCore } from "@metaplex-foundation/mpl-core"
import { createSignerFromWalletAdapter } from "@metaplex-foundation/umi-signer-wallet-adapters"
import { WalletContextState } from "@solana/wallet-adapter-react"

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
  chainKey: ChainKey;
  network: Network;
}

export type SolanaClientParams = SolanaHttpRpcUrlParams & {
  commitment?: Commitment;
};

export const getUmi = (network: Network, walletAdapter: WalletAdapter | WalletContextState) => {
    const umi = createUmi(
        solanaHttpRpcUrl({ chainKey: ChainKey.Solana, network })
    )
        .use(mplCore())
        .use(mplToolbox())
        .use(signerIdentity(createSignerFromWalletAdapter(walletAdapter), true))
    return umi
}
