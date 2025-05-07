import { Chain } from "@wormhole-foundation/sdk"

export enum ChainKey {
  Solana = "solana",
  Sui = "sui",
  Somnia = "somnia",
}

export interface ChainInfo {
  key: ChainKey;
  name: string;
  iconUrl: string;
}

export const chainKeyMap: Array<ChainInfo> = [
    {
        key: ChainKey.Solana,
        name: "Solana",
        iconUrl: "/solana.svg",
    },
    { 
        key: ChainKey.Sui,
        name: "Sui",
        iconUrl: "/sui.svg",
    },
    {
        key: ChainKey.Somnia,
        name: "Somnia",
        iconUrl: "https://docs.somnia.network/~gitbook/image?url=https%3A%2F%2F1813806305-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Forganizations%252FXixzx30CXHthiaKhEu1D%252Fsites%252Fsite_m7x2t%252Ficon%252FjdslfIGTxvTkjBH77O7V%252Flogo.png%3Falt%3Dmedia%26token%3Dfbc7ca1b-24b9-4847-ad0c-574ac536eff3&width=32&dpr=4&quality=100&sign=4c1bc3e1&sv=2",
    }
]

export enum Network {
  Testnet = "testnet",
  Mainnet = "mainnet",
}

export enum Platform {
  Solana = "solana",
  Sui = "sui",
  Evm = "evm",
}

export interface ChainAccount {
  address: string;
  privateKey: string;
  publicKey: string;
}

export const chainKeyToChain = (chainKey: string): Chain => {
    switch (chainKey) {
    case ChainKey.Solana:
        return "Solana"
    case ChainKey.Sui:
        return "Sui"
    default:
        throw new Error(`Chain not found : ${chainKey}`)
    }
}

export const chainToChainKey = (chainKey: Chain): string => {
    switch (chainKey) {
    case "Solana":
        return ChainKey.Solana
    case "Sui":
        return ChainKey.Sui
    default:
        throw new Error(`Chain not found : ${chainKey}`)
    }
}
