import { Network } from "../common"

export interface ExplorerUrlParams {
    chainKey: string,
    value: string,
    type: "address"| "tx",
    network: Network,
}