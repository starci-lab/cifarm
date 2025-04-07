import { PlacedItemTypeId } from "@/modules/entities"

export interface PlacedItemTypeAssetData {
    name: string;
}

export const placedItemTypeAssetMap: Record<PlacedItemTypeId, PlacedItemTypeAssetData> = {
    [PlacedItemTypeId.Home]: {
        name: "Home",
    },
    [PlacedItemTypeId.BeeHouse]: {
        name: "Bee House",
    },
    [PlacedItemTypeId.BasicTile]: {
        name: "Basic Tile",
    },
    [PlacedItemTypeId.Barn]: {
        name: "Barn",
    },
    [PlacedItemTypeId.Coop]: {
        name: "Coop",
    },
    [PlacedItemTypeId.Chicken]: {
        name: "Chicken",
    },
    [PlacedItemTypeId.Cow]: {
        name: "Cow",
    },
    [PlacedItemTypeId.Pig]: {
        name: "Pig",
    },
    [PlacedItemTypeId.Sheep]: {
        name: "Sheep",
    },
    [PlacedItemTypeId.PetHouse]: {
        name: "Pet House",
    },
    [PlacedItemTypeId.DragonFruit]: {
        name: "Dragon Fruit",
    },
    [PlacedItemTypeId.Jackfruit]: {
        name: "Jackfruit",
    },
    [PlacedItemTypeId.Banana]: {
        name: "Banana",
    },
    [PlacedItemTypeId.Apple]: {
        name: "Apple",
    }, 
}