import { Network } from "../common"
import { ExplorerUrlParams } from "./types"

export const solanaExplorerUrl = (
    { network, value}: ExplorerUrlParams
) => {
    switch (network) {
    case Network.Testnet:
        return {
            address: `https://solscan.io/address/${value}?cluster=devnet`,
            tx: `https:/solscan.io/tx/${value}?cluster=devnet`,
        }
    case Network.Mainnet:
        return {
            address: `https://solscan.io/address/${value}`,
            tx: `https://solscan.io/tx/${value}`,
        }
    }
}