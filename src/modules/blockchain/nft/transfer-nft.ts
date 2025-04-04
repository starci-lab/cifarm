import { ChainKey, Network } from "../common"
import { solanaHttpRpcUrl } from "../rpcs"
import { Platform, chainKeyToPlatform } from "../common"
import { defaultNetwork } from "../default"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { mplCore, transferV1 } from "@metaplex-foundation/mpl-core"
import { keypairIdentity, publicKey } from "@metaplex-foundation/umi"
import { NFTCollections } from "@/redux"
import { TransferResult } from "../types"
import base58 from "bs58"

export interface TransferNFTParams {
    chainKey: ChainKey;
    nftAddress: string;
    network?: Network;
    privateKey: string;
    recipientAddress: string;
    collectionKey: string;
    collections: NFTCollections;
}

export const transferSolanaNFT = async ({
    nftAddress,
    network,
    chainKey,
    recipientAddress,
    collectionKey,
    collections,
    privateKey
}: TransferNFTParams): Promise<TransferResult> => {
    network = network || defaultNetwork
    const umi = createUmi(solanaHttpRpcUrl({chainKey, network}))
        .use(mplCore())
    const signer = umi.eddsa.createKeypairFromSecretKey(base58.decode(privateKey))
    umi.use(keypairIdentity(signer))
    const collection = collections[collectionKey]
    if (!collection) throw new Error("Collection not found")
    const { signature } = await transferV1(umi, {
        asset: publicKey(nftAddress),
        newOwner: publicKey(recipientAddress),
        collection: publicKey(collection.collectionAddress),
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
    }
}
