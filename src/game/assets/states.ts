import {
    AnimalCurrentState,
    PlantCurrentState,
    FruitCurrentState,
} from "@/modules/entities"
import { TextureConfig } from "./types"
import { Scene } from "phaser"
import { loadTexture } from "./utils"

// State Asset Data Interface
export interface StateAssetData {
    textureConfig: TextureConfig
}

// Plant State Assets
const plantStateAssets: Record<PlantCurrentState, StateAssetData> = {
    [PlantCurrentState.Normal]: {
        textureConfig: { key: "plant-normal", assetUrl: "states/plant-normal.png" },
    },
    [PlantCurrentState.NeedWater]: {
        textureConfig: { key: "need-water", assetUrl: "states/need-water.png" },
    },
    [PlantCurrentState.IsWeedy]: {
        textureConfig: { key: "is-weedy", assetUrl: "states/is-weedy.png" },
    },
    [PlantCurrentState.IsInfested]: {
        textureConfig: { key: "is-infested", assetUrl: "states/is-infested.png" },
    },
    [PlantCurrentState.FullyMatured]: {
        textureConfig: { key: "fully-mature", assetUrl: "states/is-ready.png" },
    },
}

// Animal State Assets
const animalStateAssets: Record<AnimalCurrentState, StateAssetData> = {
    [AnimalCurrentState.Normal]: {
        textureConfig: { key: "animal-normal", assetUrl: "states/animal-normal.png" },
    },
    [AnimalCurrentState.Hungry]: {
        textureConfig: {
            key: "animal-feed",
            assetUrl: "states/animal-feed.png",
            useExisting: true,
        },
    },
    [AnimalCurrentState.Sick]: {
        textureConfig: { key: "animal-sick", assetUrl: "states/sick.png" },
    },
    [AnimalCurrentState.Yield]: {
        textureConfig: { key: "animal-yield", assetUrl: "states/animal-yield.png" },
    },
}

// Fruit State Assets
const fruitStateAssets: Record<FruitCurrentState, StateAssetData> = {
    [FruitCurrentState.Normal]: {
        textureConfig: { key: "fruit-normal", assetUrl: "states/fruit-normal.png" },
    },
    [FruitCurrentState.NeedFertilizer]: {
        textureConfig: {
            key: "fruit-fertilizer",
            assetUrl: "states/fruit-fertilizer.png",
            useExisting: true,
            scaleHeight: 0.8,
            scaleWidth: 0.8,
        },
    },
    [FruitCurrentState.IsBuggy]: {
        textureConfig: {
            key: "is-buggy",
            assetUrl: "states/is-buggy.png",
        },
    },
    [FruitCurrentState.FullyMatured]: {
        textureConfig: { key: "fruit-mature", assetUrl: "states/fruit-mature.png" },
    },
}

// Combined state asset map
export const stateAssetMap = {
    plant: plantStateAssets,
    animal: animalStateAssets,
    fruit: fruitStateAssets,
}

// Function to load all state assets
export const loadStateAssets = async (scene: Scene) => {
    for (const stateType of Object.values(stateAssetMap)) {
        for (const stateData of Object.values(stateType)) {
            const { textureConfig } = stateData
            await loadTexture(scene, textureConfig)
        }
    }
}
