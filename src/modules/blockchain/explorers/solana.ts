import { Network } from "../common"
import { ExplorerUrlParams } from "./types"

export const solanaExplorerUrl = (
    { network, value}: ExplorerUrlParams
) => {
    switch (network) {
    case Network.Testnet:
        return {
            address: `https://solscan.io/address/${value}?cluster=custom&customUrl=https%3A%2F%2Frpc.test.honeycombprotocol.com`,
            tx: `https:/solscan.io/tx/${value}?cluster=custom&customUrl=https%3A%2F%2Frpc.test.honeycombprotocol.com`,
        }
    case Network.Mainnet:
        return {
            address: `https://solscan.io/address/${value}`,
            tx: `https://solscan.io/tx/${value}`,
        }
    }
}