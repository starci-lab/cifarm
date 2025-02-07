import { Scene } from "phaser"
import { TextureConfig } from "./types"

export enum StacyAssetKey {
    StacyWelcome = "stacy-welcome",
    StacyBuySeeds = "stacy-buy-seeds",
    StacyOpenInventory = "stacy-open-inventory",
    StacyPlantSeed = "stacy-plant-seed",
    StacyWaterCrop = "stacy-water-crop",
    StacyUsePesitcide = "stacy-use-pesticide",
    StacyUseHerbicide = "stacy-use-herbicide",
    StacyNormal = "stacy-normal",
    StacyGoodbye = "stacy-goodbye",
}

interface StacyAssetData {
    // texture config
    textureConfig: TextureConfig,
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const stacyAssetMap: Record<StacyAssetKey, StacyAssetData> = {
    [StacyAssetKey.StacyWelcome]: {
        textureConfig: {
            key: "stacy-welcome",
            assetUrl: "stacy/stacy-1.png",
        },
    },
    [StacyAssetKey.StacyBuySeeds]: {
        textureConfig: {
            key: "stacy-buy-seeds",
            assetUrl: "stacy/stacy-2.png",
        },
    },
    [StacyAssetKey.StacyOpenInventory]: {
        textureConfig: {
            key: "stacy-open-inventory",
            assetUrl: "stacy/stacy-3.png",
        },
    },
    [StacyAssetKey.StacyPlantSeed]: {
        textureConfig: {
            key: "stacy-plant-seed",
            assetUrl: "stacy/stacy-4.png",
        },
    },
    [StacyAssetKey.StacyWaterCrop]: {
        textureConfig: {
            key: "stacy-water-crop",
            assetUrl: "stacy/stacy-5.png",
        },
    },
    [StacyAssetKey.StacyUsePesitcide]: {
        textureConfig: {
            key: "stacy-use-pesticide",
            assetUrl: "stacy/stacy-6.png",
        },
    },
    [StacyAssetKey.StacyUseHerbicide]: {
        textureConfig: {
            key: "stacy-use-herbicide",
            assetUrl: "stacy/stacy-7.png",
        },
    },
    [StacyAssetKey.StacyNormal]: {
        textureConfig: {
            key: "stacy-normal",
            assetUrl: "stacy/stacy-8.png",
        },
    },
    [StacyAssetKey.StacyGoodbye]: {
        textureConfig: {
            key: "stacy-bye",
            assetUrl: "stacy/stacy-9.png",
        },
    },
}

// Function to load animals assets (images) for each animal
export const loadStacyAssets = (scene: Scene) => {
    // Iterate over each animalId in the animalAssetDataMap
    Object.keys(stacyAssetMap).forEach((stacyAssetKey) => {
        const _stacyAssetKey = stacyAssetKey as StacyAssetKey
        const data = stacyAssetMap[_stacyAssetKey]

        if (!data) {
            throw new Error(`Stacy data not found for stacyAssetId: ${_stacyAssetKey}`)
        }

        const { textureConfig : { assetUrl, key } } = data

        // Load the asset for the stacy
        scene.load.image(
            key,
            assetUrl
        )
    })
}

