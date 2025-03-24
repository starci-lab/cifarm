import {
    AnimalCurrentState,
    PlantCurrentState,
    FruitCurrentState,
} from "@/modules/entities"
import { TextureConfig } from "./types"
import { Scene } from "phaser"

export interface CropStateAssetData {
  textureConfig: TextureConfig;
}

export const plantStateAssetMap: Partial<
  Record<PlantCurrentState, CropStateAssetData>
> = {
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

// Function to load animal assets in Phaser scene
export const loadPlantStateAssets = (scene: Scene) => {
    Object.keys(plantStateAssetMap).forEach((state) => {
        const _state = state as PlantCurrentState
        const plantStateData = plantStateAssetMap[_state]

        if (!plantStateData) {
            throw new Error(`Plant state data not found for state: ${state}`)
        }
        scene.load.image(
            plantStateData.textureConfig.key,
            plantStateData.textureConfig.assetUrl
        )
    })
}

export interface AnimalStateAssetData {
  textureConfig: TextureConfig;
}

export const animalStateAssetMap: Partial<
  Record<AnimalCurrentState, AnimalStateAssetData>
> = {
    [AnimalCurrentState.Hungry]: {
        textureConfig: {
            key: "animal-feed",
            assetUrl: "supplies/animal-feed.png",
            useExisting: true,
            scaleHeight: 0.8,
            scaleWidth: 0.8,
        },
    },
    [AnimalCurrentState.Sick]: {
        textureConfig: { key: "animal-sick", assetUrl: "states/sick.png" },
    },
}

// Function to load animal assets in Phaser scene
export const loadAnimalStateAssets = (scene: Scene) => {
    Object.keys(animalStateAssetMap).forEach((state) => {
        const _state = state as AnimalCurrentState
        const animalStateData = animalStateAssetMap[_state]

        if (!animalStateData) {
            throw new Error(`Animal state data not found for state: ${state}`)
        }
        if (!animalStateData.textureConfig.useExisting) {
            scene.load.image(
                animalStateData.textureConfig.key,
                animalStateData.textureConfig.assetUrl
            )
        }
    })
}

export interface FruitStateAssetData {
  textureConfig: TextureConfig;
}

export const fruitStateAssetMap: Partial<
  Record<FruitCurrentState, FruitStateAssetData>
> = {
    [FruitCurrentState.NeedFertilizer]: {
        textureConfig: {
            key: "fruit-fertilizer",
            assetUrl: "supplies/fruit-fertilizer.png",
            useExisting: true,
            scaleHeight: 0.8,
            scaleWidth: 0.8,
        },
    },
    [FruitCurrentState.IsBuggy]: {
        textureConfig: {
            key: "caterpillar-infested",
            assetUrl: "states/caterpillar-infested.png",
        },
    },
}

// Function to load fruit assets in Phaser scene
export const loadFruitStateAssets = (scene: Scene) => {
    Object.keys(fruitStateAssetMap).forEach((state) => {
        const _state = state as FruitCurrentState
        const fruitStateData = fruitStateAssetMap[_state]

        if (!fruitStateData) {
            throw new Error(`Fruit state data not found for state: ${state}`)
        }
        scene.load.image(
            fruitStateData.textureConfig.key,
            fruitStateData.textureConfig.assetUrl
        )
    })
}
