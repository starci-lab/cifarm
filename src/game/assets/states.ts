import { CropCurrentState } from "@/modules/entities"
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