import { Network, NFTTypeToPlacedItemTypeId, ChainKey } from "@/modules/blockchain"
import {
    PlacedItemType,
    StaticData,
    NFTType,
} from "@/modules/entities"
// import { StateNFTCollections } from "@/redux"

export interface GetNFTImageParams {
    nftType: NFTType;
    staticData: StaticData;
    network: Network;
    chainKey: ChainKey;
}

export const getNFTImage = ({
    nftType,
    staticData,
    network,
    chainKey,
}: GetNFTImageParams) => {
    const placedItemTypeId = NFTTypeToPlacedItemTypeId[nftType] 
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
        return staticData?.nftCollections?.[nftType]?.[chainKey]?.[network]?.imageUrl ?? ""
    }
    default: {
        throw new Error("Invalid NFT type")
    }
    }
}
