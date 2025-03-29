import {
    AnimalCurrentState,
    PlantCurrentState,
    FruitCurrentState,
} from "@/modules/entities"
import { BaseData } from "./types"
import { Scene } from "phaser"
import { loadTexture } from "./utils"

// State Asset Data Interface
export interface StateAssetData {
    base: BaseData
}



// Plant State Assets
const plantStateAssets: Record<PlantCurrentState, StateAssetData> = {
    [PlantCurrentState.Normal]: {
        base: { 
            textureConfig: {
                key: "plant-normal",
                assetUrl: "states/plant-normal.png",
            },
        },
    },
    [PlantCurrentState.NeedWater]: {
        base: { 
            textureConfig: {
                key: "need-water",
                assetUrl: "states/need-water.png",
            },
        },
    },
    [PlantCurrentState.IsWeedy]: {
        base: { 
            textureConfig: {
                key: "is-weedy",
                assetUrl: "states/is-weedy.png",
            },
        },
    },
    [PlantCurrentState.IsInfested]: {
        base: { 
            textureConfig: {
                key: "is-infested",
                assetUrl: "states/is-infested.png",
            },
        },
    },
    [PlantCurrentState.FullyMatured]: {
        base: { 
            textureConfig: {
                key: "fully-mature",
                assetUrl: "states/is-ready.png",
            },
        },
    },
}

// Animal State Assets
const animalStateAssets: Record<AnimalCurrentState, StateAssetData> = {
    [AnimalCurrentState.Normal]: {
        base: { 
            textureConfig: {
                key: "animal-normal",
                assetUrl: "states/animal-normal.png",
            },
        },
    },
    [AnimalCurrentState.Hungry]: {
        base: {
            textureConfig: {
                key: "animal-feed",
                assetUrl: "states/animal-feed.png",
                useExisting: true,
            },
        },
    },
    [AnimalCurrentState.Sick]: {
        base: { 
            textureConfig: {
                key: "animal-sick",
                assetUrl: "states/sick.png",
            },
        },
    },
    [AnimalCurrentState.Yield]: {
        base: { 
            textureConfig: {
                key: "animal-yield",
                assetUrl: "states/animal-yield.png",
            },
        },
    },
}

// Fruit State Assets
const fruitStateAssets: Record<FruitCurrentState, StateAssetData> = {
    [FruitCurrentState.Normal]: {
        base: { 
            textureConfig: {
                key: "fruit-normal",
                assetUrl: "states/fruit-normal.png",
            },
        },
    },
    [FruitCurrentState.NeedFertilizer]: {
        base: { 
            textureConfig: {
                key: "fruit-fertilizer",
                assetUrl: "states/fruit-fertilizer.png",
                useExisting: true,
                scaleHeight: 0.8,
                scaleWidth: 0.8,
            },
        },
    },
    [FruitCurrentState.IsBuggy]: {
        base: { 
            textureConfig: {
                key: "is-buggy",
                assetUrl: "states/is-buggy.png",
            },
        },
    },
    [FruitCurrentState.FullyMatured]: {
        base: { 
            textureConfig: {
                key: "fruit-mature",
                assetUrl: "states/fruit-mature.png",
            },
        },
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
    const promises: Promise<void>[] = []
    for (const stateType of Object.values(stateAssetMap)) {
        for (const stateData of Object.values(stateType)) {
            if (stateData.base) {
                promises.push(loadTexture(scene, stateData.base.textureConfig))
            }
        }
    }
    await Promise.all(promises)
}
