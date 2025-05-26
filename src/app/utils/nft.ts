import { Network, NFTTypeToPlacedItemTypeId } from "@/modules/blockchain"
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
}

export const getNFTImage = ({
    nftType,
    staticData,
    network,
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
        return staticData?.nftCollections?.[nftType]?.[network]?.imageUrl ?? ""
    }
    default: {
        throw new Error("Invalid NFT type")
    }
    }
}
