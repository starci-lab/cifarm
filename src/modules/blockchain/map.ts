import { envConfig } from "@/env"
import { ChainKey, Network } from "./common"
import { PlacedItemTypeId } from "../entities"

export enum DefaultToken {
    Native = "native",
    $CAULI = "$CAULI",
    USDC = "USDC",
    USDT = "USDT",
}

export enum DefaultCollection {
    DragonFruit = "DragonFruit",
    Jackfruit = "Jackfruit",
    Pomegranate = "Pomegranate",
    Rambutan = "Rambutan",
}

export const blockchainMap: Record<ChainKey, BlockchainInfo> = {
    [ChainKey.Solana]: {
        imageUrl: "/solana.svg",
        name: "Solana",
        honeycombProtocol: {
            [Network.Testnet]: {
                projectAddress: envConfig().honeycombProjectAddress[Network.Testnet],
            },
            [Network.Mainnet]: {
                projectAddress: envConfig().honeycombProjectAddress[Network.Mainnet],
            }
        },
        defaultCollections: {
            [Network.Testnet]: {
                [DefaultCollection.DragonFruit]: {
                    name: "Dragon Fruit",
                    imageUrl: "/products/dragon-fruit.png",
                    address: "8NC9J5AJZg3jmXnzopeiwwv9NJToLwnJjiPsJKFRdgKz",
                    placedItemTypeId: PlacedItemTypeId.DragonFruit,
                    version: 2,
                },
                [DefaultCollection.Jackfruit]: {
                    name: "Jackfruit",
                    imageUrl: "/products/jackfruit.png",
                    address: "2Ap4nT8Pby5LUEB7TvbwsLUnr1q7NBBCoLQZR4Ei3dNh",
                    placedItemTypeId: PlacedItemTypeId.Jackfruit,
                    version: 2,
                },
                [DefaultCollection.Pomegranate]: {
                    name: "Pomegranate",
                    imageUrl: "/products/pomegranate.png",
                    address: "CRUwWJr8eAPaHoj7kA5WrpKMSiotV9vdMxdXUJLZfe9b",
                    placedItemTypeId: PlacedItemTypeId.Pomegranate,
                    version: 2,
                },
                [DefaultCollection.Rambutan]: {
                    name: "Rambutan",
                    imageUrl: "/products/rambutan.png",
                    address: "4rM1G8YE7JxJPWuENSv1X5gkn6PYEJ8Wuc6bS8DZBz8K",
                    placedItemTypeId: PlacedItemTypeId.Rambutan,
                    version: 2,
                }
            },
            [Network.Mainnet]: {
                [DefaultCollection.DragonFruit]: {
                    name: "DragonFruit",
                    imageUrl: "/solana.svg",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.DragonFruit,
                },
                [DefaultCollection.Jackfruit]: {
                    name: "Jackfruit",
                    imageUrl: "/solana.svg",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.Jackfruit,
                },
                [DefaultCollection.Pomegranate]: {
                    name: "Pomegranate",
                    imageUrl: "/products/pomegranate.png",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.Pomegranate,
                },
                [DefaultCollection.Rambutan]: {
                    name: "Rambutan",
                    imageUrl: "/products/rambutan.png",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.Rambutan,
                }
            }
        },
        defaultTokens: {
            [Network.Testnet]: {
                [DefaultToken.Native]: {
                    name: "Solana",
                    symbol: "SOL",
                    address: "",
                    decimals: 9,
                    imageUrl: "/solana.svg",
                },
                [DefaultToken.$CAULI]: {
                    name: "$CAULI",
                    symbol: "$CAULI",
                    address: "",
                    decimals: 9,
                    imageUrl: "/$CAULI.png",
                },
                [DefaultToken.USDC]: {
                    name: "USDC",
                    symbol: "USDC",
                    address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
                    decimals: 6,
                    imageUrl: "/icons/usdc.svg",
                }
            },
            [Network.Mainnet]: {
                [DefaultToken.Native]: {
                    name: "Solana",
                    symbol: "SOL",
                    address: "",
                    decimals: 9,
                    imageUrl: "/solana.svg",
                },
                [DefaultToken.$CAULI]: {
                    name: "$CAULI",
                    symbol: "$CAULI",
                    address: "",
                    decimals: 9,
                    imageUrl: "/$CAULI.png",
                }
            }
        }
    },
    [ChainKey.Sui]: {
        imageUrl: "/sui.svg",
        name: "SUI",
        defaultTokens: {
            [Network.Mainnet]: {
                [DefaultToken.Native]: {
                    name: "SUI",
                    symbol: "SUI",
                    address: "",
                    decimals: 8,
                    imageUrl: "/sui.svg",
                },
                [DefaultToken.$CAULI]: {
                    name: "$CAULI",
                    symbol: "$CAULI",
                    address: "",
                    decimals: 8,
                    imageUrl: "/$CAULI.png",
                }
            },
            [Network.Testnet]: {
                [DefaultToken.Native]: {
                    name: "SUI",
                    symbol: "SUI",
                    address: "",
                    decimals: 8,
                    imageUrl: "/sui.svg",
                },
                [DefaultToken.$CAULI]: {
                    name: "$CAULI",
                    symbol: "$CAULI",
                    address: "",
                    decimals: 8,
                    imageUrl: "/$CAULI.png",
                }
            }
        },
        defaultCollections: {
            [Network.Mainnet]: {
                [DefaultCollection.DragonFruit]: {
                    name: "Dragon Fruit",
                    imageUrl: "https://violet-lazy-yak-333.mypinata.cloud/ipfs/bafkreidmxxbtbcgeceinnpnx5rggmcptbyxwbi25oiyijyfvyc72dytas4",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.DragonFruit,
                },
                [DefaultCollection.Jackfruit]: {
                    name: "Jackfruit",
                    imageUrl: "/solana.svg",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.Jackfruit,
                },
                [DefaultCollection.Pomegranate]: {
                    name: "Pomegranate",
                    imageUrl: "/products/pomegranate.png",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.Pomegranate,
                },
                [DefaultCollection.Rambutan]: {
                    name: "Rambutan",
                    imageUrl: "/products/rambutan.png",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.Rambutan,
                }
            },
            [Network.Testnet]: {
                [DefaultCollection.DragonFruit]: {
                    name: "Dragon Fruit",
                    imageUrl: "/products/dragon-fruit.png",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.DragonFruit,
                },
                [DefaultCollection.Jackfruit]: {
                    name: "Jackfruit",
                    imageUrl: "/products/jackfruit.png",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.Jackfruit,
                },
                [DefaultCollection.Pomegranate]: {
                    name: "Pomegranate",
                    imageUrl: "/products/pomegranate.png",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.Pomegranate,
                },
                [DefaultCollection.Rambutan]: {
                    name: "Rambutan",
                    imageUrl: "/products/rambutan.png",
                    address: "",
                    placedItemTypeId: PlacedItemTypeId.Rambutan,
                }
            }
        }
    }
}

export const networkMap: Record<Network, NetworkInfo> = {
    [Network.Mainnet]: {
        name: "Mainnet",
    },
    [Network.Testnet]: {
        name: "Testnet",
    }
}

export type DefaultTokens = Partial<Record<DefaultToken, TokenInfo>>
export type DefaultCollections = Partial<Record<DefaultCollection, CollectionInfo>>

export interface HoneycombProtocol {
    projectAddress: string
}

export interface BlockchainInfo {
    imageUrl: string
    name: string
    defaultTokens: Record<Network, DefaultTokens>
    honeycombProtocol?: Record<Network, HoneycombProtocol>
    defaultCollections: Record<Network, DefaultCollections>
}

export interface TokenInfo {
    name: string
    symbol: string
    address: string
    decimals: number
    imageUrl: string
    // a boolean value to check if the token is using the honeycomb protocol
    useHoneycombProtocol?: boolean
}

export interface CollectionInfo {
    name: string
    imageUrl: string
    address: string
    // to determine which fruit is in the collection
    placedItemTypeId: PlacedItemTypeId
    // collection version, determine to process update
    version?: number
}

export interface NFTInfo {
    name: string
    imageUrl: string
    tokenAddress: string
    collectionAddress: string
}

export interface NetworkInfo {
    name: string
}