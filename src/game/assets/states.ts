import {
    AnimalCurrentState,
    PlantCurrentState,
    FruitCurrentState,
} from "@/modules/entities"
import { TextureConfig } from "./types"
import { Scene } from "phaser"
import { fetchAsset } from "./fetch"

// State Asset Data Interface
export interface StateAssetData {
    textureConfig: TextureConfig
}

// Plant State Assets
const plantStateAssets: Record<PlantCurrentState, StateAssetData> = {
    [PlantCurrentState.Normal]: {
        textureConfig: { key: "plant-normal", assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/plant-normal.png" },
    },
    [PlantCurrentState.NeedWater]: {
        textureConfig: { key: "need-water", assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/need-water.png" },
    },
    [PlantCurrentState.IsWeedy]: {
        textureConfig: { key: "is-weedy", assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/is-weedy.png" },
    },
    [PlantCurrentState.IsInfested]: {
        textureConfig: { key: "is-infested", assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/is-infested.png" },
    },
    [PlantCurrentState.FullyMatured]: {
        textureConfig: { key: "fully-mature", assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/is-ready.png" },
    },
}

// Animal State Assets
const animalStateAssets: Record<AnimalCurrentState, StateAssetData> = {
    [AnimalCurrentState.Normal]: {
        textureConfig: { key: "animal-normal", assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/animal-normal.png" },
    },
    [AnimalCurrentState.Hungry]: {
        textureConfig: {
            key: "animal-feed",
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/supplies/animal-feed.png",
            useExisting: true,
        },
    },
    [AnimalCurrentState.Sick]: {
        textureConfig: { key: "animal-sick", assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/sick.png" },
    },
    [AnimalCurrentState.Yield]: {
        textureConfig: { key: "animal-yield", assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/animal-yield.png" },
    },
}

// Fruit State Assets
const fruitStateAssets: Record<FruitCurrentState, StateAssetData> = {
    [FruitCurrentState.Normal]: {
        textureConfig: { key: "fruit-normal", assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/fruit-normal.png" },
    },
    [FruitCurrentState.NeedFertilizer]: {
        textureConfig: {
            key: "fruit-fertilizer",
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/supplies/fruit-fertilizer.png",
            useExisting: true,
            scaleHeight: 0.8,
            scaleWidth: 0.8,
        },
    },
    [FruitCurrentState.IsBuggy]: {
        textureConfig: {
            key: "is-buggy",
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/is-buggy.png",
        },
    },
    [FruitCurrentState.FullyMatured]: {
        textureConfig: { key: "fruit-mature", assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/states/fruit-mature.png" },
    },
}

// Combined state asset map
export const stateAssetMap = {
    plant: plantStateAssets,
    animal: animalStateAssets,
    fruit: fruitStateAssets,
} as const

// Function to load all state assets
export const loadStateAssets = async (scene: Scene) => {
    for (const stateType of Object.values(stateAssetMap)) {
        for (const stateData of Object.values(stateType)) {
            const { textureConfig } = stateData
            if (textureConfig.assetUrl && !textureConfig.useExisting) {
                await fetchAsset({
                    key: textureConfig.key,
                    assetUrl: textureConfig.assetUrl,
                    scene,
                })
            }
        }
    }
}
