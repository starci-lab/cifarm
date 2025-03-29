import { Scene } from "phaser"
import { BaseData } from "./types"
import { cropAssetMap } from "./crops"
import {
    CropId,
    FlowerId,
    InventoryTypeId as InventoryTypeIdImport,
    ProductId,
    SupplyId,
    ToolId,
} from "@/modules/entities"
import { toolAssetMap } from "./tools"
import { productAssetMap } from "./products"
import { supplyAssetMap } from "./supply"
import { flowerAssetMap } from "./flowers"
import { loadTexture } from "./utils"

// Re-export the InventoryTypeId to avoid naming conflicts
export type InventoryTypeId = InventoryTypeIdImport;

export interface InventoryAssetData {
  name: string;
  base: BaseData;
}

export const inventoryTypeAssetMap: Record<
  InventoryTypeIdImport,
  InventoryAssetData
> = {
    [InventoryTypeIdImport.Egg]: {
        name: "Egg",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Egg].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.EggQuality]: {
        name: "High-Quality Egg",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.EggQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.Milk]: {
        name: "Milk",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Milk].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.MilkQuality]: {
        name: "Milk Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.MilkQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.Turnip]: {
        name: "Turnip",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Turnip].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.TurnipQuality]: {
        name: "Turnip Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.TurnipQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.TurnipSeed]: {
        name: "Turnip Seed",
        base: {
            textureConfig: (() => {
                if (!cropAssetMap[CropId.Turnip].shop) {
                    throw new Error("Turnip Seed shop texture not found")
                }
                const textureConfig = cropAssetMap[CropId.Turnip].shop.textureConfig
                if (!textureConfig) {
                    throw new Error("Turnip Seed shop texture not found")
                }
                return {
                    ...textureConfig,
                    useExisting: true,
                }
            })(),
        },
    },
    [InventoryTypeIdImport.Carrot]: {
        name: "Carrot",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Carrot].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.CarrotQuality]: {
        name: "Carrot Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.CarrotQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.CarrotSeed]: {
        name: "Carrot Seed",
        base: {
            textureConfig: (() => {
                if (!cropAssetMap[CropId.Carrot].shop) {
                    throw new Error("Carrot Seed shop texture not found")
                }
                const textureConfig = cropAssetMap[CropId.Carrot].shop.textureConfig    
                if (!textureConfig) {
                    throw new Error("Carrot Seed shop texture not found")
                }
                return {
                    ...textureConfig,
                    useExisting: true,
                }
            })(),
        },
    },
    [InventoryTypeIdImport.Potato]: {
        name: "Potato",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Potato].base.textureConfig ,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.PotatoQuality]: {
        name: "Potato Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.PotatoQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.PotatoSeed]: {
        name: "Potato Seed",
        base: {
            textureConfig: (() => {
                if (!cropAssetMap[CropId.Potato].shop) {
                    throw new Error("Potato Seed shop texture not found")
                }
                const textureConfig = cropAssetMap[CropId.Potato].shop.textureConfig
                if (!textureConfig) {
                    throw new Error("Potato Seed shop texture not found")
                }
                return {
                    ...textureConfig,
                    useExisting: true,
                }
            })(),
        },
    },
    [InventoryTypeIdImport.Cucumber]: {
        name: "Cucumber",
        base: {
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
    },
    [InventoryTypeIdImport.CucumberQuality]: {
        name: "Cucumber Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.CucumberQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.CucumberSeed]: {
        name: "Cucumber Seed",
        base: {
            textureConfig: {
                ...cropAssetMap[CropId.Cucumber].shop.textureConfig,
                useExisting: true,
            },
        },
    },

    [InventoryTypeIdImport.Pineapple]: {
        name: "Pineapple",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Pineapple].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.PineappleQuality]: {
        name: "Pineapple Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.PineappleQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.PineappleSeed]: {
        name: "Pineapple Seed",
        base: {
            textureConfig: (() => {
                if (!cropAssetMap[CropId.Pineapple].shop) {
                    throw new Error("Pineapple Seed shop texture not found")
                }
                const textureConfig = cropAssetMap[CropId.Pineapple].shop.textureConfig
                if (!textureConfig) {
                    throw new Error("Pineapple Seed shop texture not found")
                }
                return {
                    ...textureConfig,
                    useExisting: true,
                }
            })(),
        },
    },
    [InventoryTypeIdImport.Watermelon]: {
        name: "Watermelon",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Watermelon].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.WatermelonQuality]: {
        name: "Watermelon Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.WatermelonQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.WatermelonSeed]: {
        name: "Watermelon Seed",
        base: {
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
    },
    [InventoryTypeIdImport.BellPepper]: {
        name: "Bell Pepper",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.BellPepper].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.BellPepperQuality]: {
        name: "Bell Pepper Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.BellPepperQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.BellPepperSeed]: {
        name: "Bell Pepper Seed",
        base: {
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
    },
    [InventoryTypeIdImport.Banana]: {
        name: "Banana",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Banana].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.BananaQuality]: {
        name: "Banana Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.BananaQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.Apple]: {
        name: "Apple",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Apple].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.AppleQuality]: {
        name: "Apple Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.AppleQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.Daisy]: {
        name: "Daisy",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Daisy].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.DaisyQuality]: {
        name: "Daisy Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.DaisyQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.DaisySeed]: {
        name: "Daisy Seed",
        base: {
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
    },
    [InventoryTypeIdImport.BasicFertilizer]: {
        name: "Basic Fertilizer",
        base: {
            textureConfig: {
                ...supplyAssetMap[SupplyId.BasicFertilizer].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.AnimalFeed]: {
        name: "Animal Feed",
        base: {
            textureConfig: {
                ...supplyAssetMap[SupplyId.AnimalFeed].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.FruitFertilizer]: {
        name: "FruitFertilizer",
        base: {
            textureConfig: {
                ...supplyAssetMap[SupplyId.FruitFertilizer].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.Hand]: {
        name: "Hand",
        base: {
            textureConfig: {
                ...toolAssetMap[ToolId.Hand].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.Crate]: {
        name: "Crate",
        base: {
            textureConfig: {
                ...toolAssetMap[ToolId.Crate].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.WateringCan]: {
        name: "Watering Can",
        base: {
            textureConfig: {
                ...toolAssetMap[ToolId.WateringCan].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.Herbicide]: {
        name: "Herbicide",
        base: {
            textureConfig: {
                ...toolAssetMap[ToolId.Herbicide].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.Pesticide]: {
        name: "Pesticide",
        base: {
            textureConfig: {
                ...toolAssetMap[ToolId.Pesticide].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.Hammer]: {
        name: "Hammer",
        base: {
            textureConfig: {
                ...toolAssetMap[ToolId.Hammer].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.AnimalMedicine]: {
        name: "Animal Medicine",
        base: {
            textureConfig: {
                ...toolAssetMap[ToolId.AnimalMedicine].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.BugNet]: {
        name: "BugNet",
        base: {
            textureConfig: {
                ...toolAssetMap[ToolId.BugNet].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.StrawberrySeed]: {
        name: "Strawberry Seed",
        base: {
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
    },
    [InventoryTypeIdImport.Strawberry]: {
        name: "Strawberry",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.Strawberry].base.textureConfig,
                useExisting: true,
            },
        },
    },
    [InventoryTypeIdImport.StrawberryQuality]: {
        name: "Strawberry Quality",
        base: {
            textureConfig: {
                ...productAssetMap[ProductId.StrawberryQuality].base.textureConfig,
                useExisting: true,
            },
        },
    },
}

// Function to load all inventory type assets
export const loadInventoryTypesAssets = async (scene: Scene) => {
    const promises: Promise<void>[] = []
    // Load all inventory type assets
    for (const inventoryData of Object.values(inventoryTypeAssetMap)) {
        if (inventoryData.base) {
            promises.push(loadTexture(scene, inventoryData.base.textureConfig))
        }
    }
    await Promise.all(promises)
}
