import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { cropAssetMap } from "./crops"
import { CropId, InventoryTypeId, ProductId, SupplyId, ToolId } from "@/modules/entities"
import { toolAssetMap } from "./tools"
import { productAssetMap } from "./products"
import { supplyAssetMap } from "./supply"

export interface InventoryAssetData {
  name: string;
  textureConfig: TextureConfig;
}

export const inventoryTypeAssetMap: Record<
  InventoryTypeId,
  InventoryAssetData
> = {
    [InventoryTypeId.Egg]: {
        name: "Egg",
        textureConfig: { ...productAssetMap[ProductId.Egg].textureConfig, useExisting: true },
    },
    [InventoryTypeId.EggQuality]: {
        name: "High-Quality Egg",
        textureConfig: { ...productAssetMap[ProductId.EggQuality].textureConfig, useExisting: true },
    },
    [InventoryTypeId.Milk]: {
        name: "Milk",
        textureConfig: { ...productAssetMap[ProductId.Milk].textureConfig, useExisting: true },
    },
    [InventoryTypeId.MilkQuality]: {
        name: "Milk Quality",
        textureConfig: { ...productAssetMap[ProductId.MilkQuality].textureConfig, useExisting: true },
    },
    [InventoryTypeId.Carrot]: {
        name: "Carrot",
        textureConfig: { ...productAssetMap[ProductId.Carrot].textureConfig, useExisting: true },  
    },
    [InventoryTypeId.CarrotQuality]: {
        name: "Carrot Quality",
        textureConfig: { ...productAssetMap[ProductId.CarrotQuality].textureConfig, useExisting: true },
    },
    [InventoryTypeId.CarrotSeed]: {
        name: "Carrot Seed",
        textureConfig: { ...cropAssetMap[CropId.Carrot].seed.textureConfig, useExisting: true },
    },
    [InventoryTypeId.Potato]: {
        name: "Potato",
        textureConfig: { ...productAssetMap[ProductId.Potato].textureConfig, useExisting: true },
    },
    [InventoryTypeId.PotatoQuality]: {
        name: "Potato Quality",
        textureConfig: { ...productAssetMap[ProductId.PotatoQuality].textureConfig, useExisting: true },
    },
    [InventoryTypeId.PotatoSeed]: {
        name: "Potato Seed",
        textureConfig: { ...cropAssetMap[CropId.Potato].seed.textureConfig, useExisting: true },
    },

    [InventoryTypeId.Cucumber]: {
        name: "Cucumber",
        textureConfig: { ...productAssetMap[ProductId.Cucumber].textureConfig, useExisting: true },
    },
    [InventoryTypeId.CucumberQuality]: {
        name: "Cucumber Quality",
        textureConfig: { ...productAssetMap[ProductId.CucumberQuality].textureConfig, useExisting: true },
    },
    [InventoryTypeId.CucumberSeed]: {
        name: "Cucumber Seed",
        textureConfig: { ...cropAssetMap[CropId.Cucumber].seed.textureConfig, useExisting: true },
    },

    [InventoryTypeId.Pineapple]: {
        name: "Pineapple",
        textureConfig: { ...productAssetMap[ProductId.Pineapple].textureConfig, useExisting: true },
    },
    [InventoryTypeId.PineappleQuality]: {
        name: "Pineapple Quality",
        textureConfig: { ...productAssetMap[ProductId.PineappleQuality].textureConfig, useExisting: true },
    },
    [InventoryTypeId.PineappleSeed]: {
        name: "Pineapple Seed",
        textureConfig: { ...cropAssetMap[CropId.Pineapple].seed.textureConfig, useExisting: true },
    },
    [InventoryTypeId.Watermelon]: {
        name: "Watermelon",
        textureConfig: { ...productAssetMap[ProductId.Watermelon].textureConfig, useExisting: true },
    },
    [InventoryTypeId.WatermelonQuality]: {
        name: "Watermelon Quality",
        textureConfig: { ...productAssetMap[ProductId.WatermelonQuality].textureConfig, useExisting: true },
    },
    [InventoryTypeId.WatermelonSeed]: {
        name: "Watermelon Seed",
        textureConfig: { ...cropAssetMap[CropId.Watermelon].seed.textureConfig, useExisting: true },
    },

    [InventoryTypeId.BellPepper]: {
        name: "Bell Pepper",
        textureConfig: { ...productAssetMap[ProductId.BellPepper].textureConfig, useExisting: true },
    },
    [InventoryTypeId.BellPepperQuality]: {
        name: "Bell Pepper Quality",
        textureConfig: { ...productAssetMap[ProductId.BellPepperQuality].textureConfig, useExisting: true },
    },
    [InventoryTypeId.BellPepperSeed]: {
        name: "Bell Pepper Seed",
        textureConfig: cropAssetMap[CropId.BellPepper].seed.textureConfig,
    },

    [InventoryTypeId.BasicFertilizer]: {
        name: "Basic Fertilizer",
        textureConfig: { ...supplyAssetMap[SupplyId.BasicFertilizer].textureConfig, useExisting: true },
    },
    [InventoryTypeId.AnimalFeed]: {
        name: "Animal Feed",
        textureConfig: { ...supplyAssetMap[SupplyId.AnimalFeed].textureConfig, useExisting: true },
    },
    [InventoryTypeId.Hand]: {
        name: "Hand",
        textureConfig: { ...toolAssetMap[ToolId.Hand].textureConfig, useExisting: true },
    },
    [InventoryTypeId.Crate]: {
        name: "Crate",
        textureConfig: {...toolAssetMap[ToolId.Crate].textureConfig, useExisting: true },
    },
    [InventoryTypeId.WateringCan]: {
        name: "Watering Can",
        textureConfig: { ...toolAssetMap[ToolId.WateringCan].textureConfig, useExisting: true },
    },
    [InventoryTypeId.Herbicide]: {
        name: "Herbicide",
        textureConfig: { ...toolAssetMap[ToolId.Herbicide].textureConfig, useExisting: true },
    },
    [InventoryTypeId.Pesticide]: {
        name: "Pesticide",
        textureConfig: { ...toolAssetMap[ToolId.Pesticide].textureConfig, useExisting: true },
    },
}

// Function to load inventory assets in Phaser scene
export const loadInventoryTypesAssets = (scene: Scene) => {
    Object.keys(inventoryTypeAssetMap).forEach((inventoryTypeId) => {
        const _inventoryTypeId = inventoryTypeId as InventoryTypeId
        const inventoryData = inventoryTypeAssetMap[_inventoryTypeId]

        if (!inventoryData) {
            throw new Error(
                `Inventory asset data not found for inventoryTypeId: ${inventoryTypeId}`
            )
        }

        const { key, assetUrl, useExisting } = inventoryData.textureConfig
        if (useExisting) {
            return
        }
        scene.load.image(key, assetUrl)
    })
}
