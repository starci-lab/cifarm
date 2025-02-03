import { BuildingId } from "@/modules/entities"
import { Scene } from "phaser"

const BASE_DIR = "buildings"

export interface BuildingAssetData {
  gid: number;
  name: string;
  extension: string;
  filename: string;
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const buildingAssetMap: Record<BuildingId, BuildingAssetData> = {
    [BuildingId.Home]: {
        gid: 500,
        name: "Barn",
        extension: "png",
        filename: "home",
    },
    [BuildingId.Coop]: {
        gid: 510,
        name: "Farm",
        extension: "png",
        filename: "coop",
    },
    [BuildingId.Barn]: {
        gid: 520,
        name: "Barn",
        extension: "png",
        filename: "barn",
    },
}

// Function to load animals assets (images) for each animal
export const loadBuildingAssets = (scene: Scene) => {
    // Iterate over each animalId in the animalAssetDataMap
    Object.keys(buildingAssetMap).forEach((buildingIdKey) => {
        const buildingId = buildingIdKey as BuildingId
        const buildingData = buildingAssetMap[buildingId]

        if (!buildingData) {
            throw new Error(`Building data not found for buildingId: ${buildingId}`)
        }

        // Load the asset for the building
        scene.load.image(
            getBuildingAssetKey(buildingId),
            `${BASE_DIR}/${buildingData.filename}.${buildingData.extension}`
        )
    })
}

export const getBuildingAssetKey = (buildingId: BuildingId) => {
    return `buildings-${buildingId}`
}
