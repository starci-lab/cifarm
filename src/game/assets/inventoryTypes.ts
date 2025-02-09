import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { cropAssetMap } from "./crops"
import { tileAssetMap } from "./tiles"
import { AnimalId, CropId, TileId } from "@/modules/entities"
import { animalAssetMap } from "./animals"

export enum InventoryTypeId {
    Egg = "egg",
    EggQuality = "eggQuality",
    Chicken = "chicken",
    Milk = "milk",
    MilkQuality = "milkQuality",
    Cow = "cow",
    Carrot = "carrot",
    CarrotQuality = "carrotQuality",
    CarrotSeed = "carrotSeed",
    Potato = "potato",
    PotatoQuality = "potatoQuality",
    PotatoSeed = "potatoSeed",
    Cucumber = "cucumber",
    CucumberQuality = "cucumberQuality",
    CucumberSeed = "cucumberSeed",
    Pineapple = "pineapple",
    PineappleQuality = "pineappleQuality",
    PineappleSeed = "pineappleSeed",
    Watermelon = "watermelon",
    WatermelonQuality = "watermelonQuality",
    WatermelonSeed = "watermelonSeed",
    BellPepper = "bellPepper",
    BellPepperQuality = "bellPepperQuality",
    BellPepperSeed = "bellPepperSeed",
    BasicTile2 = "basicTile2",
    FertileTile = "fertileTile",
    BasicFertilizer = "basicFertilizer",
    AnimalFeed = "animalFeed"
}

export interface InventoryAssetData {
    name: string;
    textureConfig: TextureConfig;
    isQuality?: boolean;
}

export const inventoryTypeAssetMap: Record<InventoryTypeId, InventoryAssetData> = {
    [InventoryTypeId.Egg]: {
        name: "Egg",
        textureConfig: animalAssetMap[AnimalId.Chicken].product.textureConfig
    },
    [InventoryTypeId.EggQuality]: {
        name: "High-Quality Egg",
        textureConfig: animalAssetMap[AnimalId.Chicken].product.textureConfig,
        isQuality: true
    },
    [InventoryTypeId.Chicken]: {
        name: "Chicken",
        textureConfig: animalAssetMap[AnimalId.Chicken].ages.baby.textureConfig
    },
    [InventoryTypeId.Milk]: {
        name: "Milk",
        textureConfig: animalAssetMap[AnimalId.Cow].product.textureConfig
    },
    [InventoryTypeId.MilkQuality]: {
        name: "High-Quality Milk",
        textureConfig: animalAssetMap[AnimalId.Cow].product.textureConfig,
        isQuality: true
    },
    [InventoryTypeId.Cow]: {
        name: "Cow",
        textureConfig: animalAssetMap[AnimalId.Cow].ages.baby.textureConfig
    },
    [InventoryTypeId.Carrot]: {
        name: "Carrot",
        textureConfig: cropAssetMap[CropId.Carrot].textureConfig
    },
    [InventoryTypeId.CarrotQuality]: {
        name: "High-Quality Carrot",
        textureConfig: cropAssetMap[CropId.Carrot].textureConfig,
        isQuality: true
    },
    [InventoryTypeId.CarrotSeed]: {
        name: "Carrot Seed",
        textureConfig: cropAssetMap[CropId.Carrot].seed.textureConfig
    },

    [InventoryTypeId.Potato]: {
        name: "Potato",
        textureConfig: cropAssetMap[CropId.Potato].textureConfig
    },
    [InventoryTypeId.PotatoQuality]: {
        name: "High-Quality Potato",
        textureConfig: cropAssetMap[CropId.Potato].textureConfig,
        isQuality: true
    },
    [InventoryTypeId.PotatoSeed]: {
        name: "Potato Seed",
        textureConfig: cropAssetMap[CropId.Potato].seed.textureConfig
    },

    [InventoryTypeId.Cucumber]: {
        name: "Cucumber",
        textureConfig: cropAssetMap[CropId.Cucumber].textureConfig
    },
    [InventoryTypeId.CucumberQuality]: {
        name: "High-Quality Cucumber",
        textureConfig: cropAssetMap[CropId.Cucumber].textureConfig,
        isQuality: true
    },
    [InventoryTypeId.CucumberSeed]: {
        name: "Cucumber Seed",
        textureConfig: cropAssetMap[CropId.Cucumber].seed.textureConfig
    },

    [InventoryTypeId.Pineapple]: {
        name: "Pineapple",
        textureConfig: cropAssetMap[CropId.Pineapple].textureConfig
    },
    [InventoryTypeId.PineappleQuality]: {
        name: "High-Quality Pineapple",
        textureConfig: cropAssetMap[CropId.Pineapple].textureConfig,
        isQuality: true
    },
    [InventoryTypeId.PineappleSeed]: {
        name: "Pineapple Seed",
        textureConfig: cropAssetMap[CropId.Pineapple].seed.textureConfig
    },

    [InventoryTypeId.Watermelon]: {
        name: "Watermelon",
        textureConfig: cropAssetMap[CropId.Watermelon].textureConfig
    },
    [InventoryTypeId.WatermelonQuality]: {
        name: "High-Quality Watermelon",
        textureConfig: cropAssetMap[CropId.Watermelon].textureConfig,
        isQuality: true
    },
    [InventoryTypeId.WatermelonSeed]: {
        name: "Watermelon Seed",
        textureConfig: cropAssetMap[CropId.Watermelon].seed.textureConfig
    },

    [InventoryTypeId.BellPepper]: {
        name: "Bell Pepper",
        textureConfig: cropAssetMap[CropId.BellPepper].textureConfig
    },
    [InventoryTypeId.BellPepperQuality]: {
        name: "High-Quality Bell Pepper",
        textureConfig: cropAssetMap[CropId.BellPepper].textureConfig,
        isQuality: true
    },
    [InventoryTypeId.BellPepperSeed]: {
        name: "Bell Pepper Seed",
        textureConfig: cropAssetMap[CropId.BellPepper].seed.textureConfig
    },

    // Tiles (tận dụng asset từ tileAssetMap)
    [InventoryTypeId.BasicTile2]: {
        name: "Basic Tile 2",
        textureConfig: tileAssetMap[TileId.BasicTile2].textureConfig
    },
    [InventoryTypeId.FertileTile]: {
        name: "Fertile Tile",
        textureConfig: tileAssetMap[TileId.FertileTile].textureConfig
    },

    [InventoryTypeId.BasicFertilizer]: {
        name: "Basic Fertilizer",
        textureConfig: { key: "basic-fertilizer", assetUrl: "inventory/basic-fertilizer.png" }
    },
    [InventoryTypeId.AnimalFeed]: {
        name: "Animal Feed",
        textureConfig: { key: "animal-feed", assetUrl: "inventory/animal-feed.png" }
    }
}

// Function to load inventory assets in Phaser scene
export const loadInventoryAssets = (scene: Scene) => {
    Object.keys(inventoryTypeAssetMap).forEach((inventoryTypeId) => {
        const _inventoryTypeId = inventoryTypeId as InventoryTypeId
        const inventoryData = inventoryTypeAssetMap[_inventoryTypeId]

        if (!inventoryData) {
            throw new Error(`Inventory asset data not found for inventoryTypeId: ${inventoryTypeId}`)
        }

        const { key, assetUrl } = inventoryData.textureConfig
        scene.load.image(key, assetUrl)
    })
}
