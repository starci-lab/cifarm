import { envConfig } from "@/env"
import { ChainKey, Network } from "./common"
import { PlacedItemTypeId } from "../entities"

export enum DefaultToken {
    Native = "native",
    $CARROT = "$CARROT",
    $CAULI = "$CAULI",
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
                    name: "DragonFruit",
                    imageUrl: "/products/dragon-fruit.png",
                    address: "FkJJyaMCMmNHGWQkBkrVBo9Trz8o9ZffKBcpyC3SdZx4",
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
            [Network.Mainnet]: {
                [DefaultToken.Native]: {
                    name: "Solana",
                    symbol: "SOL",
                    address: "",
                    decimals: 9,
                    imageUrl: "/solana.svg",
                },
                [DefaultToken.$CARROT]: {
                    name: "$CARROT",
                    symbol: "$CARROT",
                    address: "",
                    decimals: 9,
                    imageUrl: "/$CARROT.png",
                    useHoneycombProtocol: true,
                },
                [DefaultToken.$CAULI]: {
                    name: "$CAULI",
                    symbol: "$CAULI",
                    address: "",
                    decimals: 9,
                    imageUrl: "/$CAULI.png",
                }
            },
            [Network.Testnet]: {
                [DefaultToken.Native]: {
                    name: "Solana",
                    symbol: "SOL",
                    address: "",
                    decimals: 9,
                    imageUrl: "/solana.svg",
                },
                [DefaultToken.$CARROT]: {
                    name: "$CARROT",
                    symbol: "$CARROT",
                    address: envConfig().honeycombTokenAddress[Network.Testnet],
                    decimals: 9,
                    imageUrl: "/$CARROT.png",
                    useHoneycombProtocol: true,
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
                [DefaultToken.$CARROT]: {
                    name: "$CARROT",
                    symbol: "$CARROT",
                    address: "",
                    decimals: 8,
                    imageUrl: "/$CARROT.png",
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
                [DefaultToken.$CARROT]: {
                    name: "$CARROT",
                    symbol: "$CARROT",
                    address: "",
                    decimals: 8,
                    imageUrl: "/$CARROT.png",
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
                    name: "DragonFruit",
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
                    name: "DragonFruit",
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

export type DefaultTokens = Record<DefaultToken, TokenInfo>
export type DefaultCollections = Record<DefaultCollection, CollectionInfo>

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