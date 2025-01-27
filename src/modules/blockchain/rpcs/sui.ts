
import { Network } from "../common"
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client"

const networkMap: Record<Network,"mainnet"|"testnet" > = {
    [Network.Mainnet]: "mainnet",
    [Network.Testnet]: "testnet"
}

export const suiClient = (network: Network) => {
    const suiNetwork = networkMap[network]
    const rpcUrl = getFullnodeUrl(suiNetwork)
    return new SuiClient({ url: rpcUrl })
}

export const SUI_COIN_TYPE = "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI"