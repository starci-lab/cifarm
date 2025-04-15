import { useGraphQLQueryStaticSwr } from "@/hooks"
import { assetFruitMap } from "@/modules/assets"
import { AttributeName, NFTData } from "@/modules/blockchain"
import { PlacedItemType, FruitInfoSchema } from "@/modules/entities"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import { QUERY_STATIC_SWR_MUTATION } from "../constants"

export const useNFTImage = (collectionKey: string, nft: NFTData) => {
    const collections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )
    const collection = collections[collectionKey]
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        QUERY_STATIC_SWR_MUTATION
    )
    const placedItemType = staticSwr.data?.data.placedItemTypes.find(
        (placedItemType) => placedItemType.displayId === collection.placedItemTypeId
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    const type = nft.attributes.find(
        (attribute) => attribute.key === AttributeName.Type
    )?.value as PlacedItemType
    const data = nft.attributes.find(
        (attribute) => attribute.key === AttributeName.Data
    )?.value as string
    switch (type) {
    case PlacedItemType.Fruit:
    {
        const fruit = staticSwr.data?.data.fruits.find(
            (fruit) => fruit.id === placedItemType.fruit
        )
        if (!fruit) {
            throw new Error("Fruit not found")
        }
        const { currentStage = 1 } = JSON.parse(data) as Partial<FruitInfoSchema> 
        return assetFruitMap[fruit.displayId].base.stages[currentStage].assetKey
    }
    }
}   
