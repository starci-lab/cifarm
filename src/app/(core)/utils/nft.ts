import { QueryStaticResponse } from "@/modules/apollo"
import { Network, NFTCollectionKeyToPlacedItemTypeId } from "@/modules/blockchain"
import {
    PlacedItemType,
    NFTCollectionKey,
} from "@/types"
// import { StateNFTCollections } from "@/redux"

export interface GetNFTImageParams {
    nftCollectionKey: NFTCollectionKey;
    staticData: QueryStaticResponse;
    network: Network;
}

export const getNFTImage = ({
    nftCollectionKey,
    staticData,
    network,
}: GetNFTImageParams) => {
    const placedItemTypeId = NFTCollectionKeyToPlacedItemTypeId[nftCollectionKey] 
    const placedItemType = staticData.placedItemTypes?.find(
        (placedItemType) => placedItemType.displayId === placedItemTypeId   
    )
    switch (placedItemType?.type) {
    case PlacedItemType.Fruit: {
        const fruit = staticData.fruits?.find(
            (fruit) => fruit.id === placedItemType.fruit
        )
        if (!fruit) {
            throw new Error("Fruit not found")
        }
        return staticData?.nftCollections?.[nftCollectionKey]?.[network]?.imageUrl ?? ""
    }
    default: {
        throw new Error("Invalid NFT type")
    }
    }
}
