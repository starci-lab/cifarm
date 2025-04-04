import { ChainKey, Network } from "../common"
import { solanaHttpRpcUrl } from "../rpcs"
import { Platform, chainKeyToPlatform } from "../common"
import { NFTCollections } from "@/redux"
import { defaultNetwork } from "../default"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { fetchAssetsByCollection, mplCore } from "@metaplex-foundation/mpl-core"
import { publicKey } from "@metaplex-foundation/umi"
import axios from "axios"

export interface GetCollectionParams {
  chainKey: ChainKey;
  //use collection address
  collectionAddress?: string;
  collectionKey?: string;
  network?: Network;
  accountAddress: string;
  //collection list for the chainKey, if collectionKey is set but collections not set, it will throw an error
  collections?: NFTCollections;
}

export interface NFTTrait {
    key: string
    value: string
}
export interface NFTData {
    name: string;
    nftAddress: string;
    imageUrl: string;
    traits: Array<NFTTrait>
}

export interface CollectionResponse {
    nfts: Array<NFTData>;
}

export const getSolanaCollection = async ({
    collectionAddress,
    network,
    collectionKey,
    accountAddress,
    collections,
    chainKey,
}: GetCollectionParams): Promise<CollectionResponse> => {
    network = network || defaultNetwork
    if (collectionKey) {
        if (!collections) throw new Error("Cannot find collection without collections")
        const collection = collections[collectionKey]
        if (!collection) throw new Error("Cannot find collection without collections")
        collectionAddress = collection.collectionAddress
    }
    if (!collectionAddress) throw new Error("Cannot find collection without collection address")
    const umi = createUmi(solanaHttpRpcUrl({chainKey, network}))
        .use(mplCore())
    let assets = await fetchAssetsByCollection(umi, publicKey(collectionAddress))
    assets = assets.filter((asset) => asset.owner.toString() === accountAddress)
    
    const nfts: Array<NFTData> = []
    const promises: Array<Promise<void>> = []
    for (const asset of assets) {
        promises.push((async () => {
            const metadata = await axios.get<MetaplexNFTMetadata>(asset.uri)
            nfts.push({
                name: metadata.data.name,
                nftAddress: asset.publicKey.toString(),
                imageUrl: metadata.data.image,
                traits: metadata.data.attributes?.map((attribute) => ({
                    key: attribute.trait_type,
                    value: attribute.value.toString()
                })) || [],
            })
        })())
    }
    await Promise.all(promises)
    // with filters
    return {
        nfts
    }
}

export const getCollection = (params: GetCollectionParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Solana:
        return getSolanaCollection(params)
    case Platform.Sui:
        throw new Error("Sui is not supported")
    }
}

export interface MetaplexNFTMetadata {
    name: string
    description: string
    image: string
    external_url?: string
    properties?: {
        files?: Array<{
            uri: string
            type: string
        }>
        category?: string
    }
    attributes?: Array<{
        trait_type: string
        value: string | number
    }>
    animation_url?: string
    youtube_url?: string
}
