// we use range of GID from 12001 - 13000 to represent different types of buildings
import { ToolId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { fetchAsset } from "./fetch"

export interface ToolAssetData {
  name: string;
  // texture config
  textureConfig: TextureConfig
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const toolAssetMap: Record<ToolId, ToolAssetData> = {
    [ToolId.Hand]: {
        name: "Hand",
        textureConfig: {
            key: "hand",
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/tools/hand.png",
        }
    },
    [ToolId.WateringCan]: {
        name: "Watering Can",
        textureConfig: {
            key: "watering-can",
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/tools/watering-can.png",
        }
    },
    [ToolId.Herbicide]: {
        name: "Herbicide",
        textureConfig: {
            key: "herbicide",
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/tools/herbicide.png",
        }
    },
    [ToolId.Pesticide]: {
        name: "Pesticide",
        textureConfig: {
            key: "pesticide",
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/tools/pesticide.png",
        }
    },
    [ToolId.Crate]: {
        name: "Crate",
        textureConfig: {
            key: "crate",
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/tools/crate.png",
        }
    },
    [ToolId.Hammer]: {
        name: "Hammer",
        textureConfig: {
            key: "hammer",
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/tools/hammer.png",
        }
    },
    [ToolId.AnimalMedicine]: {
        name: "Animal Medicine",
        textureConfig: {
            key: "animal-medicine",
            assetUrl: "tools/animal-medicine.png",
        }
    },
    [ToolId.BugNet]: {
        name: "Bug Net",
        textureConfig: {
            key: "bug-net",
            assetUrl: "tools/bug-net.png",
        }
    },
}

// function to load the tools assets
export const loadToolAssets = async (scene: Scene) => {
    // Load all tool assets
    for (const toolData of Object.values(toolAssetMap)) {
        const { key, assetUrl, useExisting } = toolData.textureConfig
        if (!useExisting) {
            if (!assetUrl) {
                throw new Error("Asset URL not found")
            }
            await fetchAsset({
                key,
                assetUrl,
                scene,
            })
        }
    }
}