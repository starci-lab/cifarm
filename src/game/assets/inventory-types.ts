import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { cropAssetMap } from "./crops"
import {
    CropId,
    FlowerId,
    InventoryTypeId,
    ProductId,
    SupplyId,
    ToolId,
} from "@/modules/entities"
import { toolAssetMap } from "./tools"
import { productAssetMap } from "./products"
import { supplyAssetMap } from "./supply"
import { flowerAssetMap } from "./flowers"
import { fetchAsset } from "./fetch"

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
        textureConfig: {
            ...productAssetMap[ProductId.Egg].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.EggQuality]: {
        name: "High-Quality Egg",
        textureConfig: {
            ...productAssetMap[ProductId.EggQuality].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.Milk]: {
        name: "Milk",
        textureConfig: {
            ...productAssetMap[ProductId.Milk].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.MilkQuality]: {
        name: "Milk Quality",
        textureConfig: {
            ...productAssetMap[ProductId.MilkQuality].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.Turnip]: {
        name: "Turnip",
        textureConfig: {
            ...productAssetMap[ProductId.Turnip].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.TurnipQuality]: {
        name: "Turnip Quality",
        textureConfig: {
            ...productAssetMap[ProductId.TurnipQuality].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.TurnipSeed]: {
        name: "Turnip Seed",
        textureConfig: (() => {
            if (!cropAssetMap[CropId.Turnip].shop) {
                throw new Error("Turnip Seed shop texture not found")
            }
            return {
                ...cropAssetMap[CropId.Turnip].shop.textureConfig,
                useExisting: true,
            }
        })(),
    },
    [InventoryTypeId.Carrot]: {
        name: "Carrot",
        textureConfig: {
            ...productAssetMap[ProductId.Carrot].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.CarrotQuality]: {
        name: "Carrot Quality",
        textureConfig: {
            ...productAssetMap[ProductId.CarrotQuality].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.CarrotSeed]: {
        name: "Carrot Seed",
        textureConfig: (() => {
            if (!cropAssetMap[CropId.Carrot].shop) {
                throw new Error("Carrot Seed shop texture not found")
            }
            return {
                ...cropAssetMap[CropId.Carrot].shop.textureConfig,
                useExisting: true,
            }
        })(),
    },
    [InventoryTypeId.Potato]: {
        name: "Potato",
        textureConfig: {
            ...productAssetMap[ProductId.Potato].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.PotatoQuality]: {
        name: "Potato Quality",
        textureConfig: {
            ...productAssetMap[ProductId.PotatoQuality].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.PotatoSeed]: {
        name: "Potato Seed",
        textureConfig: (() => {
            if (!cropAssetMap[CropId.Potato].shop) {
                throw new Error("Potato Seed shop texture not found")
            }
            return {
                ...cropAssetMap[CropId.Potato].shop.textureConfig,
                useExisting: true,
            }
        })(),
    },
    [InventoryTypeId.Cucumber]: {
        name: "Cucumber",
        textureConfig: (() => {
            if (!cropAssetMap[CropId.Cucumber].shop) {
                throw new Error("Cucumber shop texture not found")
            }
            return {
                ...cropAssetMap[CropId.Potato].shop.textureConfig,
                useExisting: true,
            }
        })(),
    },
    [InventoryTypeId.CucumberQuality]: {
        name: "Cucumber Quality",
        textureConfig: {
            ...productAssetMap[ProductId.CucumberQuality].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.CucumberSeed]: {
        name: "Cucumber Seed",
        textureConfig: {
            ...cropAssetMap[CropId.Cucumber].shop.textureConfig,
            useExisting: true,
        },
    },

    [InventoryTypeId.Pineapple]: {
        name: "Pineapple",
        textureConfig: {
            ...productAssetMap[ProductId.Pineapple].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.PineappleQuality]: {
        name: "Pineapple Quality",
        textureConfig: {
            ...productAssetMap[ProductId.PineappleQuality].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.PineappleSeed]: {
        name: "Pineapple Seed",
        textureConfig: (() => {
            if (!cropAssetMap[CropId.Pineapple].shop) {
                throw new Error("Pineapple Seed shop texture not found")
            }
            return {
                ...cropAssetMap[CropId.Pineapple].shop.textureConfig,
                useExisting: true,
            }
        })(),
    },
    [InventoryTypeId.Watermelon]: {
        name: "Watermelon",
        textureConfig: {
            ...productAssetMap[ProductId.Watermelon].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.WatermelonQuality]: {
        name: "Watermelon Quality",
        textureConfig: {
            ...productAssetMap[ProductId.WatermelonQuality].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.WatermelonSeed]: {
        name: "Watermelon Seed",
        textureConfig: (() => {
            if (!cropAssetMap[CropId.Watermelon].shop) {
                throw new Error("Watermelon Seed shop texture not found")
            }
            return {
                ...cropAssetMap[CropId.Watermelon].shop.textureConfig,
                useExisting: true,
            }
        })(),
    },
    [InventoryTypeId.BellPepper]: {
        name: "Bell Pepper",
        textureConfig: {
            ...productAssetMap[ProductId.BellPepper].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.BellPepperQuality]: {
        name: "Bell Pepper Quality",
        textureConfig: {
            ...productAssetMap[ProductId.BellPepperQuality].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.BellPepperSeed]: {
        name: "Bell Pepper Seed",
        textureConfig: (() => {
            if (!cropAssetMap[CropId.BellPepper].shop) {
                throw new Error("Bell Pepper Seed shop texture not found")
            }
            return {
                ...cropAssetMap[CropId.BellPepper].shop.textureConfig,
                useExisting: true,
            }
        })(),
    },
    [InventoryTypeId.Banana]: {
        name: "Banana",
        textureConfig: {
            ...productAssetMap[ProductId.Banana].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.BananaQuality]: {
        name: "Banana Quality",
        textureConfig: {
            ...productAssetMap[ProductId.BananaQuality].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.Apple]: {
        name: "Apple",
        textureConfig: {
            ...productAssetMap[ProductId.Apple].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.AppleQuality]: {
        name: "Apple Quality",
        textureConfig: {
            ...productAssetMap[ProductId.AppleQuality].textureConfig,
            useExisting: true,
        }
    },
    [InventoryTypeId.Daisy]: {
        name: "Daisy",
        textureConfig: {
            ...productAssetMap[ProductId.Daisy].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.DaisyQuality]: {
        name: "Daisy Quality",
        textureConfig: {
            ...productAssetMap[ProductId.DaisyQuality].textureConfig,
            useExisting: true,
        }
    },
    [InventoryTypeId.DaisySeed]: {
        name: "Daisy Seed",
        textureConfig: (() => {
            if (!flowerAssetMap[FlowerId.Daisy].shop) {
                throw new Error("Daisy Seed shop texture not found")
            }
            return {
                ...flowerAssetMap[FlowerId.Daisy].shop.textureConfig,
                useExisting: true,
            }
        })(),
    },
    [InventoryTypeId.BasicFertilizer]: {
        name: "Basic Fertilizer",
        textureConfig: {
            ...supplyAssetMap[SupplyId.BasicFertilizer].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.AnimalFeed]: {
        name: "Animal Feed",
        textureConfig: {
            ...supplyAssetMap[SupplyId.AnimalFeed].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.FruitFertilizer]: {
        name: "FruitFertilizer",
        textureConfig: {
            ...supplyAssetMap[SupplyId.FruitFertilizer].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.Hand]: {
        name: "Hand",
        textureConfig: {
            ...toolAssetMap[ToolId.Hand].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.Crate]: {
        name: "Crate",
        textureConfig: {
            ...toolAssetMap[ToolId.Crate].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.WateringCan]: {
        name: "Watering Can",
        textureConfig: {
            ...toolAssetMap[ToolId.WateringCan].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.Herbicide]: {
        name: "Herbicide",
        textureConfig: {
            ...toolAssetMap[ToolId.Herbicide].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.Pesticide]: {
        name: "Pesticide",
        textureConfig: {
            ...toolAssetMap[ToolId.Pesticide].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.Hammer]: {
        name: "Hammer",
        textureConfig: {
            ...toolAssetMap[ToolId.Hammer].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.AnimalMedicine]: {
        name: "Animal Medicine",
        textureConfig: {
            ...toolAssetMap[ToolId.AnimalMedicine].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.BugNet]: {
        name: "BugNet",
        textureConfig: {
            ...toolAssetMap[ToolId.BugNet].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.StrawberrySeed]: {
        name: "Strawberry Seed",
        textureConfig: (() => {
            if (!cropAssetMap[CropId.Strawberry].shop) {
                throw new Error("Strawberry Seed shop texture not found")
            }
            return {
                ...cropAssetMap[CropId.Strawberry].shop.textureConfig,
                useExisting: true,
            }
        })(),
    },
    [InventoryTypeId.Strawberry]: {
        name: "Strawberry",
        textureConfig: {
            ...productAssetMap[ProductId.Strawberry].textureConfig,
            useExisting: true,
        },
    },
    [InventoryTypeId.StrawberryQuality]: {
        name: "Strawberry Quality",
        textureConfig: {
            ...productAssetMap[ProductId.StrawberryQuality].textureConfig,
            useExisting: true,
        }
    },
}

// Function to load all inventory type assets
export const loadInventoryTypesAssets = async (scene: Scene) => {
    // Load all inventory type assets
    for (const inventoryData of Object.values(inventoryTypeAssetMap)) {
        if (inventoryData.textureConfig.assetUrl) {
            await fetchAsset({
                key: inventoryData.textureConfig.key,
                assetUrl: inventoryData.textureConfig.assetUrl,
                scene,
            })
        }
    }
}
