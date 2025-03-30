// we use range of GID from 12001 - 13000 to represent different types of buildings
import { ToolId } from "@/modules/entities"
import { Scene } from "phaser"
import { BaseData } from "./types"
import { loadTexture } from "./utils"

export interface ToolAssetData {
  name: string;
  // texture config
  base: BaseData
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const toolAssetMap: Record<ToolId, ToolAssetData> = {
    [ToolId.Hand]: {
        name: "Hand",
        base: {
            textureConfig: {
                key: "hand",
                assetUrl: "tools/hand.png",
            }
        }
    },
    [ToolId.WateringCan]: {
        name: "Watering Can",
        base: {
            textureConfig: {
                key: "watering-can",
                assetUrl: "tools/watering-can.png",
                version: 1,
            }
        }
    },
    [ToolId.Herbicide]: {
        name: "Herbicide",
        base: {
            textureConfig: {
                key: "herbicide",
                assetUrl: "tools/herbicide.png",
            },
        },
    },
    [ToolId.Pesticide]: {
        name: "Pesticide",
        base: {
            textureConfig: {
                key: "pesticide",
                assetUrl: "tools/pesticide.png",
            },
        },
    },
    [ToolId.Crate]: {
        name: "Crate",
        base: {
            textureConfig: {
                key: "crate",
                assetUrl: "tools/crate.png",
            },
        },
    },
    [ToolId.Hammer]: {
        name: "Hammer",
        base: {
            textureConfig: {
                key: "hammer",
                assetUrl: "tools/hammer.png",
            },
        },
    },
    [ToolId.AnimalMedicine]: {
        name: "Animal Medicine",
        base: {
            textureConfig: {
                key: "animal-medicine",
                assetUrl: "tools/animal-medicine.png",
            },
        },
    },
    [ToolId.BugNet]: {
        name: "Bug Net",
        base: {
            textureConfig: {
                key: "bug-net",
                assetUrl: "tools/bug-net.png",
            },
        },
    },
}

// function to load the tools assets
export const loadToolAssets = async (scene: Scene) => {
    // Load all tool assets
    const promises: Promise<void>[] = []
    for (const toolData of Object.values(toolAssetMap)) {
        if (toolData.base) {
            promises.push(loadTexture(scene, toolData.base.textureConfig))
        }
    }
    await Promise.all(promises)
}