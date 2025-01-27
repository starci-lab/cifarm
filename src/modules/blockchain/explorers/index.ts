import { solanaExplorerUrl } from "./solana"
import { ExplorerUrlParams } from "./types"
import { suiExplorerUrl } from "./sui"

export const explorerUrl = (params: ExplorerUrlParams) => {
    switch (params.chainKey) {
    case "solana":
        return solanaExplorerUrl(params)[params.type]
    case "sui":
        return suiExplorerUrl(params)[params.type]
    default:
        throw new Error(`Chain not supported: ${params.chainKey}`)
    }
}