import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { cropAssetMap } from "./crops"
import { AnimalId, CropId, InventoryTypeId, ToolId } from "@/modules/entities"
import { animalAssetMap } from "./animals"
import { toolAssetMap } from "./tools"

export interface InventoryAssetData {
  name: string;
  textureConfig: TextureConfig;
  isQuality?: boolean;
}

export const inventoryTypeAssetMap: Record<
  InventoryTypeId,
  InventoryAssetData
> = {
    [InventoryTypeId.Egg]: {
        name: "Egg",
        textureConfig: animalAssetMap[AnimalId.Chicken].product.textureConfig,
    },
    [InventoryTypeId.EggQuality]: {
        name: "High-Quality Egg",
        textureConfig: animalAssetMap[AnimalId.Chicken].product.textureConfig,
        isQuality: true,
    },
    [InventoryTypeId.Chicken]: {
        name: "Chicken",
        textureConfig: animalAssetMap[AnimalId.Chicken].ages.baby.textureConfig,
    },
    [InventoryTypeId.Milk]: {
        name: "Milk",
        textureConfig: animalAssetMap[AnimalId.Cow].product.textureConfig,
    },
    [InventoryTypeId.MilkQuality]: {
        name: "High-Quality Milk",
        textureConfig: animalAssetMap[AnimalId.Cow].product.textureConfig,
        isQuality: true,
    },
    [InventoryTypeId.Cow]: {
        name: "Cow",
        textureConfig: animalAssetMap[AnimalId.Cow].ages.baby.textureConfig,
    },
    [InventoryTypeId.Carrot]: {
        name: "Carrot",
        textureConfig: cropAssetMap[CropId.Carrot].textureConfig,
    },
    [InventoryTypeId.CarrotQuality]: {
        name: "High-Quality Carrot",
        textureConfig: cropAssetMap[CropId.Carrot].textureConfig,
        isQuality: true,
    },
    [InventoryTypeId.CarrotSeed]: {
        name: "Carrot Seed",
        textureConfig: cropAssetMap[CropId.Carrot].seed.textureConfig,
    },

    [InventoryTypeId.Potato]: {
        name: "Potato",
        textureConfig: cropAssetMap[CropId.Potato].textureConfig,
    },
    [InventoryTypeId.PotatoQuality]: {
        name: "High-Quality Potato",
        textureConfig: cropAssetMap[CropId.Potato].textureConfig,
        isQuality: true,
    },
    [InventoryTypeId.PotatoSeed]: {
        name: "Potato Seed",
        textureConfig: cropAssetMap[CropId.Potato].seed.textureConfig,
    },

    [InventoryTypeId.Cucumber]: {
        name: "Cucumber",
        textureConfig: cropAssetMap[CropId.Cucumber].textureConfig,
    },
    [InventoryTypeId.CucumberQuality]: {
        name: "High-Quality Cucumber",
        textureConfig: cropAssetMap[CropId.Cucumber].textureConfig,
        isQuality: true,
    },
    [InventoryTypeId.CucumberSeed]: {
        name: "Cucumber Seed",
        textureConfig: cropAssetMap[CropId.Cucumber].seed.textureConfig,
    },

    [InventoryTypeId.Pineapple]: {
        name: "Pineapple",
        textureConfig: cropAssetMap[CropId.Pineapple].textureConfig,
    },
    [InventoryTypeId.PineappleQuality]: {
        name: "High-Quality Pineapple",
        textureConfig: cropAssetMap[CropId.Pineapple].textureConfig,
        isQuality: true,
    },
    [InventoryTypeId.PineappleSeed]: {
        name: "Pineapple Seed",
        textureConfig: cropAssetMap[CropId.Pineapple].seed.textureConfig,
    },

    [InventoryTypeId.Watermelon]: {
        name: "Watermelon",
        textureConfig: cropAssetMap[CropId.Watermelon].textureConfig,
    },
    [InventoryTypeId.WatermelonQuality]: {
        name: "High-Quality Watermelon",
        textureConfig: cropAssetMap[CropId.Watermelon].textureConfig,
        isQuality: true,
    },
    [InventoryTypeId.WatermelonSeed]: {
        name: "Watermelon Seed",
        textureConfig: cropAssetMap[CropId.Watermelon].seed.textureConfig,
    },

    [InventoryTypeId.BellPepper]: {
        name: "Bell Pepper",
        textureConfig: cropAssetMap[CropId.BellPepper].textureConfig,
    },
    [InventoryTypeId.BellPepperQuality]: {
        name: "High-Quality Bell Pepper",
        textureConfig: cropAssetMap[CropId.BellPepper].textureConfig,
        isQuality: true,
    },
    [InventoryTypeId.BellPepperSeed]: {
        name: "Bell Pepper Seed",
        textureConfig: cropAssetMap[CropId.BellPepper].seed.textureConfig,
    },

    [InventoryTypeId.BasicFertilizer]: {
        name: "Basic Fertilizer",
        textureConfig: {
            key: "basic-fertilizer",
            assetUrl: "inventory/basic-fertilizer.png",
        },
    },
    [InventoryTypeId.AnimalFeed]: {
        name: "Animal Feed",
        textureConfig: {
            key: "animal-feed",
            assetUrl: "inventory/animal-feed.png",
        },
    },
    [InventoryTypeId.Hand]: {
        name: "Hand",
        textureConfig: {
            key: "hand",
            assetUrl: toolAssetMap[ToolId.Hand].textureConfig.assetUrl,
            useExisting: true,
        },
    },
    [InventoryTypeId.Scythe]: {
        name: "Scythe",
        textureConfig: {
            key: "scythe",
            assetUrl: toolAssetMap[ToolId.Scythe].textureConfig.assetUrl,
            useExisting: true,
        },
    },
    [InventoryTypeId.ThiefHand]: {
        name: "Thief Hand",
        textureConfig: {
            key: "thief-hand",
            assetUrl: toolAssetMap[ToolId.ThiefHand].textureConfig.assetUrl,
            useExisting: true,
        },
    },
    [InventoryTypeId.WateringCan]: {
        name: "Watering Can",
        textureConfig: {
            key: "watering-can",
            assetUrl: toolAssetMap[ToolId.WateringCan].textureConfig.assetUrl,
            useExisting: true,
        },
    },
    [InventoryTypeId.Herbicide]: {
        name: "Herbicide",
        textureConfig: {
            key: "herbicide",
            assetUrl: toolAssetMap[ToolId.Herbicide].textureConfig.assetUrl,
            useExisting: true,
        },
    },
    [InventoryTypeId.Pesticide]: {
        name: "Pesticide",
        textureConfig: {
            key: "pesticide",
            assetUrl: toolAssetMap[ToolId.Pesticide].textureConfig.assetUrl,
            useExisting: true,
        },
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
