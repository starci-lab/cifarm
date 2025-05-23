import { PlacedItemTypeId } from "@/modules/entities"

import { NFTType } from "@/modules/entities"

export const NFTTypeToPlacedItemTypeId: Record<NFTType, PlacedItemTypeId> = {
    [NFTType.DragonFruit]: PlacedItemTypeId.DragonFruit,
    [NFTType.Jackfruit]: PlacedItemTypeId.Jackfruit,
    [NFTType.Rambutan]: PlacedItemTypeId.Rambutan,
    [NFTType.Pomegranate]: PlacedItemTypeId.Pomegranate,
}   

