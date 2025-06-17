import {
    AnimalCurrentState,
    PlantCurrentState,
    FruitCurrentState,
} from "@/types"

import { AssetTextureData } from "./types"
import { getAssetUrl } from "./utils"

// State Asset Data Interface
export interface StateAssetData {
    phaser: {
        base: AssetTextureData
    }
}

const PREFIX = "/states"

// Plant State Assets
const plantStateAssets: Partial<Record<PlantCurrentState, StateAssetData>> = {
    [PlantCurrentState.NeedWater]: {
        phaser: {
            base: {
                assetKey: "need-water",
                assetUrl: getAssetUrl(`${PREFIX}/need-water.png`),
            },
        },
    },
    [PlantCurrentState.IsWeedy]: {
        phaser: {
            base: { 
                assetKey: "is-weedy",
                assetUrl: getAssetUrl(`${PREFIX}/is-weedy.png`),
            },
        },
    },
    [PlantCurrentState.IsInfested]: {
        phaser: {
            base: { 
                assetKey: "is-infested",
                assetUrl: getAssetUrl(`${PREFIX}/is-infested.png`),
            },
        },
    },
}

// Animal State Assets
const animalStateAssets: Partial<Record<AnimalCurrentState, StateAssetData>> = {
    [AnimalCurrentState.Hungry]: {
        phaser: {
            base: {
                assetKey: "hungry",
                assetUrl: getAssetUrl(`${PREFIX}/hungry.png`),
            },
        },
    },
    [AnimalCurrentState.Sick]: {
        phaser: {
            base: { 
                assetKey: "animal-sick",
                assetUrl: getAssetUrl(`${PREFIX}/sick.png`),
            },
        },
    },
}

// Fruit State Assets
const fruitStateAssets: Partial<Record<FruitCurrentState, StateAssetData>> = {
    [FruitCurrentState.NeedFertilizer]: {
        phaser: {
            base: { 
                assetKey: "need-fruit-fertilizer",
                assetUrl: getAssetUrl(`${PREFIX}/need-fruit-fertilizer.png`),
            },
        },
    },
    [FruitCurrentState.IsBuggy]: {
        phaser: {
            base: { 
                assetKey: "is-buggy",
                assetUrl: getAssetUrl(`${PREFIX}/is-buggy.png`),
            },
        },
    },
}

export interface StateAssetMap {    
    plant: Partial<Record<PlantCurrentState, StateAssetData>>
    animal: Partial<Record<AnimalCurrentState, StateAssetData>>
    fruit: Partial<Record<FruitCurrentState, StateAssetData>>
}
// Combined state asset map
export const assetStateMap: StateAssetMap = {
    plant: plantStateAssets,
    animal: animalStateAssets,
    fruit: fruitStateAssets,
}