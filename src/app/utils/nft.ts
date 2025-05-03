import { assetFruitMap } from "@/modules/assets"
import { AttributeName, NFTData, NFTTypeToPlacedItemTypeId } from "@/modules/blockchain"
import {
    PlacedItemType,
    FruitInfoSchema,
    StaticData,
    NFTType,
} from "@/modules/entities"
import { StateNFTCollections } from "@/redux"

export interface GetNFTImageParams {
  collectionKey: string;
  nft: NFTData;
  collections: StateNFTCollections;
  staticData: StaticData;
}

export const getNFTImage = ({
    collectionKey,
    nft,
    collections,
    staticData,
}: GetNFTImageParams) => {
    const collection = collections[collectionKey]
    const placedItemType = staticData.placedItemTypes?.find(
        (placedItemType) => placedItemType.displayId === collection.placedItemTypeId
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    const data = nft.attributes.find(
        (attribute) => attribute.key === AttributeName.Data
    )?.value as string

    const type = placedItemType.type ?? PlacedItemType.Fruit
    switch (type) {
    case PlacedItemType.Fruit: {
        const fruit = staticData.fruits?.find(
            (fruit) => fruit.id === placedItemType.fruit
        )
        if (!fruit) {
            throw new Error("Fruit not found")
        }
        const parsedData = data
            ? (JSON.parse(data) as Partial<FruitInfoSchema>)
            : {}
        const currentStage = parsedData.currentStage ?? 0
        return assetFruitMap[fruit.displayId].base.stages[currentStage].assetUrl
    }
    default: {
        throw new Error("Invalid NFT type")
    }
    }
}

export interface GetNFTImageFromNFTTypeParams {
    nftType: NFTType;
    staticData: StaticData;
}

export const getNFTImageFromNFTType = ({
    nftType,
    staticData,
}: GetNFTImageFromNFTTypeParams) => {
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
        return assetFruitMap[fruit.displayId].base.stages[0].assetUrl
    }
    default: {
        throw new Error("Invalid NFT type")
    }
    }
}
