import { Network } from "../common"
import { ExplorerUrlParams } from "./types"

export const solanaExplorerUrl = (
    { network, value}: ExplorerUrlParams
) => {
    switch (network) {
    case Network.Testnet:
        return {
            address: `https://explorer.solana.com/address/${value}?cluster=devnet`,
            tx: `https://explorer.solana.com/tx/${value}?cluster=devnet`,
        }
    case Network.Mainnet:
        return {
            address: `https://explorer.solana.com/address/${value}`,
            tx: `https://explorer.solana.com/tx/${value}`,
        }
    }
}