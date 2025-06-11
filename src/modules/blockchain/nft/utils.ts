import { PlacedItemTypeId } from "@/modules/entities"

import { NFTCollectionKey } from "@/modules/entities"

export const NFTCollectionKeyToPlacedItemTypeId: Record<NFTCollectionKey, PlacedItemTypeId> = {
    [NFTCollectionKey.DragonFruit]: PlacedItemTypeId.DragonFruit,
    [NFTCollectionKey.Jackfruit]: PlacedItemTypeId.Jackfruit,
    [NFTCollectionKey.Rambutan]: PlacedItemTypeId.Rambutan,
    [NFTCollectionKey.Pomegranate]: PlacedItemTypeId.Pomegranate,
}   

