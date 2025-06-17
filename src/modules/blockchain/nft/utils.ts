import { PlacedItemTypeId } from "@/types"

import { NFTCollectionKey } from "@/types"

export const NFTCollectionKeyToPlacedItemTypeId: Record<NFTCollectionKey, PlacedItemTypeId> = {
    [NFTCollectionKey.DragonFruit]: PlacedItemTypeId.DragonFruit,
    [NFTCollectionKey.Jackfruit]: PlacedItemTypeId.Jackfruit,
    [NFTCollectionKey.Rambutan]: PlacedItemTypeId.Rambutan,
    [NFTCollectionKey.Pomegranate]: PlacedItemTypeId.Pomegranate,
}   

