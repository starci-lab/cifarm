import { AnimalCurrentState, CropCurrentState } from "@/modules/entities"
import { TextureConfig } from "./types"
import { Scene } from "phaser"

export interface CropStateAssetData {
    textureConfig: TextureConfig;
}

export const cropStateAssetMap: Partial<Record<CropCurrentState, CropStateAssetData>> = {
    [CropCurrentState.NeedWater]: {
        textureConfig: { key: "need-water", assetUrl: "states/need-water.png" },
    },
    [CropCurrentState.IsWeedy]: {
        textureConfig: { key: "is-weedy", assetUrl: "states/is-weedy.png" },
    },
    [CropCurrentState.IsInfested]: {
        textureConfig: { key: "is-infested", assetUrl: "states/is-infested.png" },
    },
    [CropCurrentState.FullyMatured]: {
        textureConfig: { key: "fully-mature", assetUrl: "states/is-ready.png" },
    },
}

// Function to load animal assets in Phaser scene
export const loadCropStateAssets = (scene: Scene) => {
    Object.keys(cropStateAssetMap).forEach((state) => {
        const _state = state as CropCurrentState
        const cropStateData = cropStateAssetMap[_state]

        if (!cropStateData) {
            throw new Error(`Crop state data not found for state: ${state}`)
        }
        scene.load.image(cropStateData.textureConfig.key, cropStateData.textureConfig.assetUrl)
    })
}

export interface AnimalStateAssetData {
    textureConfig: TextureConfig;
}

export const animalStateAssetMap: Partial<Record<AnimalCurrentState, AnimalStateAssetData>> = {
    [AnimalCurrentState.Hungry]: {
        textureConfig: { key: "is-animal-hungry", assetUrl: "states/is-hungry.png" },
    },
    [AnimalCurrentState.Sick]: {
        textureConfig: { key: "is-animal-sick", assetUrl: "states/is-sick.png" },
    },
    [AnimalCurrentState.Yield]: {
        textureConfig: { key: "is-animal-ready", assetUrl: "states/is-ready.png" },
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
        scene.load.image(animalStateData.textureConfig.key, animalStateData.textureConfig.assetUrl)
    })
}