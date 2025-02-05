// we use range of GID from 12001 - 13000 to represent different types of buildings
import { ToolId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig } from "./types"

export interface ToolAssetData {
  name: string;
  // texture config
  textureConfig: TextureConfig
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const toolAssetMap: Record<ToolId, ToolAssetData> = {
    [ToolId.WaterCan]: {
        name: "Water Can",
        textureConfig: {
            key: "water-can",
            assetUrl: "tools/water-can.png",
        }
    },
    [ToolId.Herbicide]: {
        name: "Herbicide",
        textureConfig: {
            key: "herbicide",
            assetUrl: "tools/herbicide.png",
        }
    },
    [ToolId.Pesticide]: {
        name: "Pesticide",
        textureConfig: {
            key: "pesticide",
            assetUrl: "tools/pesticide.png",
        }
    },
    [ToolId.Scythe]: {
        name: "Scythe",
        textureConfig: {
            key: "scythe",
            assetUrl: "tools/scythe.png",
        }
    },
    [ToolId.ThiefHand]: {
        name: "Thief Hand",
        textureConfig: {
            key: "thief-hand",
            assetUrl: "tools/thief-hand.png",
        }
    },
}

// function to load the tools assets
export const loadToolsAssets = (scene: Scene) => {
    // Iterate over each animalId in the animalAssetDataMap
    Object.keys(toolAssetMap).forEach((toolId) => {
        const _toolId = toolId as ToolId
        const buildingData = toolAssetMap[_toolId]

        if (!buildingData) {
            throw new Error(`Tool asset data not found for toolId: ${toolId}`)
        }

        // Load the asset for the building
        const { key, assetUrl} = buildingData.textureConfig
        scene.load.image(
            key,
            assetUrl
        )
    })
}