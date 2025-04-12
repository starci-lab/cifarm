import {
    AnimalCurrentState,
    PlantCurrentState,
    FruitCurrentState,
} from "@/modules/entities"

import { AssetTextureData } from "./types"

// State Asset Data Interface
export interface StateAssetData {
    phaser: {
        base: AssetTextureData
    }
}

// Plant State Assets
const plantStateAssets: Partial<Record<PlantCurrentState, StateAssetData>> = {
    [PlantCurrentState.NeedWater]: {
        phaser: {
            base: {
                assetKey: "need-water",
                assetUrl: "states/need-water.png",
            },
        },
    },
    [PlantCurrentState.IsWeedy]: {
        phaser: {
            base: { 
                assetKey: "is-weedy",
                assetUrl: "states/is-weedy.png",
            },
        },
    },
    [PlantCurrentState.IsInfested]: {
        phaser: {
            base: { 
                assetKey: "is-infested",
                assetUrl: "states/is-infested.png",
            },
        },
    },
    [PlantCurrentState.FullyMatured]: {
        phaser: {
            base: { 
                assetKey: "fully-mature",
                assetUrl: "states/is-ready.png",
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
                assetUrl: "states/hungry.png",
            },
        },
    },
    [AnimalCurrentState.Sick]: {
        phaser: {
            base: { 
                assetKey: "animal-sick",
                assetUrl: "states/sick.png",
            },
        },
    },
    [AnimalCurrentState.Yield]: {
        phaser: {
            base: { 
                assetKey: "animal-yield",
                assetUrl: "states/animal-yield.png",
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
                assetUrl: "states/need-fruit-fertilizer.png",
            },
        },
    },
    [FruitCurrentState.IsBuggy]: {
        phaser: {
            base: { 
                assetKey: "is-buggy",
                assetUrl: "states/is-buggy.png",
            },
        },
    },
    [FruitCurrentState.FullyMatured]: {
        phaser: {
            base: { 
                assetKey: "fruit-mature",
                assetUrl: "states/fruit-mature.png",
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