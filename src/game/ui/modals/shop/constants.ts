import { animalAssetMap, buildingAssetMap, cropAssetMap, tileAssetMap } from "@/game/assets"
import { AnimalId, BuildingId, CropId, TileId } from "@/modules/entities"
import { TabData } from "../../elements"
import { ShopTab } from "./types"

export const ITEM_DATA_KEY = "item-data"

export const tabsConfig: Record<ShopTab, TabData> = {
    [ShopTab.Seeds]: {
        iconKey: cropAssetMap[CropId.Carrot].seed.textureConfig.key,
        scale: 0.8,
        offsets: {
            x: 70,
            y: -40,
        }
    },
    [ShopTab.Animals]: {
        iconKey: animalAssetMap[AnimalId.Cow].ages.baby.textureConfig.key,
        offsets: {
            x: 40,
            y: -20,
        },
        scale: 0.7
    },
    [ShopTab.Buildings]: {
        iconKey: buildingAssetMap[BuildingId.Coop].textureConfig.key,
        offsets: {
            x: 80,
            y: -40,
        },
        scale: 0.3
    },
    [ShopTab.Tiles]: {
        iconKey: tileAssetMap[TileId.BasicTile1].textureConfig.key,
        offsets: {
            x: 80,
            y: -40,
        },
        scale: 0.8
    },
    [ShopTab.Trees]: {
        iconKey: tileAssetMap[TileId.BasicTile1].textureConfig.key,
        offsets: {
            x: 80,
            y: -40,
        },
        scale: 0.8
    },
    [ShopTab.Decorations]: {
        iconKey: tileAssetMap[TileId.BasicTile1].textureConfig.key,
        offsets: {
            x: 80,
            y: -40,
        },
        scale: 0.8
    },
    [ShopTab.Others]: {
        iconKey: tileAssetMap[TileId.BasicTile1].textureConfig.key,
        offsets: {
            x: 80,
            y: -40,
        },
        scale: 0.8
    },
}