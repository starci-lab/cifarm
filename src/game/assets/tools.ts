// we use range of GID from 12001 - 13000 to represent different types of buildings
import { ToolId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { loadTexture } from "./utils"

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
            assetUrl: "tools/hand.png",
        }
    },
    [ToolId.WateringCan]: {
        name: "Watering Can",
        textureConfig: {
            key: "watering-can",
            assetUrl: "tools/watering-can.png",
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
    [ToolId.Crate]: {
        name: "Crate",
        textureConfig: {
            key: "crate",
            assetUrl: "tools/crate.png",
        }
    },
    [ToolId.Hammer]: {
        name: "Hammer",
        textureConfig: {
            key: "hammer",
            assetUrl: "tools/hammer.png",
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
        await loadTexture(scene, toolData.textureConfig)
    }
}