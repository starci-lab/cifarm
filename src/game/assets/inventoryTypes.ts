import { Scene } from "phaser"
import { TextureConfig } from "./types"

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
}

export const inventoryTypeAssetMap: Record<InventoryTypeId, InventoryAssetData> = {
    [InventoryTypeId.Egg]: {
        name: "Egg",
        textureConfig: {
            key: "egg",
            assetUrl: "inventory/egg.png",
        }
    },
    [InventoryTypeId.EggQuality]: {
        name: "High-Quality Egg",
        textureConfig: {
            key: "egg-quality",
            assetUrl: "inventory/egg-quality.png",
        }
    },
    [InventoryTypeId.Chicken]: {
        name: "Chicken",
        textureConfig: {
            key: "chicken",
            assetUrl: "inventory/chicken.png",
        }
    },
    [InventoryTypeId.Milk]: {
        name: "Milk",
        textureConfig: {
            key: "milk",
            assetUrl: "inventory/milk.png",
        }
    },
    [InventoryTypeId.MilkQuality]: {
        name: "High-Quality Milk",
        textureConfig: {
            key: "milk-quality",
            assetUrl: "inventory/milk-quality.png",
        }
    },
    [InventoryTypeId.Cow]: {
        name: "Cow",
        textureConfig: {
            key: "cow",
            assetUrl: "inventory/cow.png",
        }
    },
    [InventoryTypeId.Carrot]: {
        name: "Carrot",
        textureConfig: {
            key: "carrot",
            assetUrl: "inventory/carrot.png",
        }
    },
    [InventoryTypeId.CarrotQuality]: {
        name: "High-Quality Carrot",
        textureConfig: {
            key: "carrot-quality",
            assetUrl: "inventory/carrot-quality.png",
        }
    },
    [InventoryTypeId.CarrotSeed]: {
        name: "Carrot Seed",
        textureConfig: {
            key: "carrot-seed",
            assetUrl: "inventory/carrot-seed.png",
        }
    },
    [InventoryTypeId.Potato]: {
        name: "Potato",
        textureConfig: {
            key: "potato",
            assetUrl: "inventory/potato.png",
        }
    },
    [InventoryTypeId.PotatoQuality]: {
        name: "High-Quality Potato",
        textureConfig: {
            key: "potato-quality",
            assetUrl: "inventory/potato-quality.png",
        }
    },
    [InventoryTypeId.PotatoSeed]: {
        name: "Potato Seed",
        textureConfig: {
            key: "potato-seed",
            assetUrl: "inventory/potato-seed.png",
        }
    },
    [InventoryTypeId.Cucumber]: {
        name: "Cucumber",
        textureConfig: {
            key: "cucumber",
            assetUrl: "inventory/cucumber.png",
        }
    },
    [InventoryTypeId.CucumberQuality]: {
        name: "High-Quality Cucumber",
        textureConfig: {
            key: "cucumber-quality",
            assetUrl: "inventory/cucumber-quality.png",
        }
    },
    [InventoryTypeId.CucumberSeed]: {
        name: "Cucumber Seed",
        textureConfig: {
            key: "cucumber-seed",
            assetUrl: "inventory/cucumber-seed.png",
        }
    },
    [InventoryTypeId.Pineapple]: {
        name: "Pineapple",
        textureConfig: {
            key: "pineapple",
            assetUrl: "inventory/pineapple.png",
        }
    },
    [InventoryTypeId.PineappleQuality]: {
        name: "High-Quality Pineapple",
        textureConfig: {
            key: "pineapple-quality",
            assetUrl: "inventory/pineapple-quality.png",
        }
    },
    [InventoryTypeId.PineappleSeed]: {
        name: "Pineapple Seed",
        textureConfig: {
            key: "pineapple-seed",
            assetUrl: "inventory/pineapple-seed.png",
        }
    },
    [InventoryTypeId.Watermelon]: {
        name: "Watermelon",
        textureConfig: {
            key: "watermelon",
            assetUrl: "inventory/watermelon.png",
        }
    },
    [InventoryTypeId.WatermelonQuality]: {
        name: "High-Quality Watermelon",
        textureConfig: {
            key: "watermelon-quality",
            assetUrl: "inventory/watermelon-quality.png",
        }
    },
    [InventoryTypeId.WatermelonSeed]: {
        name: "Watermelon Seed",
        textureConfig: {
            key: "watermelon-seed",
            assetUrl: "inventory/watermelon-seed.png",
        }
    },
    [InventoryTypeId.BellPepper]: {
        name: "Bell Pepper",
        textureConfig: {
            key: "bell-pepper",
            assetUrl: "inventory/bell-pepper.png",
        }
    },
    [InventoryTypeId.BellPepperQuality]: {
        name: "High-Quality Bell Pepper",
        textureConfig: {
            key: "bell-pepper-quality",
            assetUrl: "inventory/bell-pepper-quality.png",
        }
    },
    [InventoryTypeId.BellPepperSeed]: {
        name: "Bell Pepper Seed",
        textureConfig: {
            key: "bell-pepper-seed",
            assetUrl: "inventory/bell-pepper-seed.png",
        }
    },
    [InventoryTypeId.BasicTile2]: {
        name: "Basic Tile",
        textureConfig: {
            key: "basic-tile2",
            assetUrl: "inventory/basic-tile2.png",
        }
    },
    [InventoryTypeId.FertileTile]: {
        name: "Fertile Tile",
        textureConfig: {
            key: "fertile-tile",
            assetUrl: "inventory/fertile-tile.png",
        }
    },
    [InventoryTypeId.BasicFertilizer]: {
        name: "Basic Fertilizer",
        textureConfig: {
            key: "basic-fertilizer",
            assetUrl: "inventory/basic-fertilizer.png",
        }
    },
    [InventoryTypeId.AnimalFeed]: {
        name: "Animal Feed",
        textureConfig: {
            key: "animal-feed",
            assetUrl: "inventory/animal-feed.png",
        }
    }
}

// Function to load the inventory assets in Phaser scene
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
