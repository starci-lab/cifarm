import { ChainKey, Network } from "../common"
import { Platform, chainKeyToPlatform } from "../common"
import { defaultNetwork } from "../default"
import { transferV1 } from "@metaplex-foundation/mpl-core"
import { publicKey } from "@metaplex-foundation/umi"
import { TransferResult } from "../types"
import base58 from "bs58"
import { NFTCollections, NFTCollectionKey } from "@/types"
import { Umi } from "@metaplex-foundation/umi"

export interface TransferNFTParams {
    chainKey: ChainKey;
    nftAddress: string;
    network?: Network;
    recipientAddress: string;
    collectionKey: NFTCollectionKey;
    collections: NFTCollections;
    // solana only
    umi?: Umi;
}

export const transferSolanaNFT = async ({
    nftAddress,
    network,
    recipientAddress,
    collectionKey,
    collections,
    umi,
}: TransferNFTParams): Promise<TransferResult> => {
    if (!umi) throw new Error("Umi is required")
    network = network || defaultNetwork
    const collection = collections[collectionKey]
    if (!collection) throw new Error("Collection not found")
    const { signature } = await transferV1(umi, {
        asset: publicKey(nftAddress),
        newOwner: publicKey(recipientAddress),
        collection: publicKey(collection[network]?.collectionAddress ?? ""),
    }).sendAndConfirm(umi)
    return {
        txHash: base58.encode(signature)
    }
}

export const transferNFT = (params: TransferNFTParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Solana:
        return transferSolanaNFT(params)
    case Platform.Sui:
        throw new Error("Sui is not supported")
    default:
        throw new Error("Unsupported chain key")
    }
}
