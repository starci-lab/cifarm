import { CropId } from "@/modules/entities"
import { Scene } from "phaser"

// Number of growth stages for each crop
export const NUM_GROWTH_STAGES = 5

// Enum for crop names
export enum CropName {
  Carrot = "carrot",
  Cabbage = "cabbage",
  BellPepper = "bell-pepper",
  Cucumber = "cucumber",
  Pineapple = "pineapple",
  Potato = "potato",
  Pumpkin = "pumpkin",
  Strawberry = "strawberry",
  Watermelon = "watermelon",
}

// Crop map with the GID for each crop
export const cropAssetDataMap: Record<CropName, CropAssetData> = {
    [CropName.Carrot]: { gid: 100 },
    [CropName.Cabbage]: { gid: 110 },
    [CropName.BellPepper]: { gid: 120 },
    [CropName.Cucumber]: { gid: 130 },
    [CropName.Pineapple]: { gid: 140 },
    [CropName.Potato]: { gid: 150 },
    [CropName.Pumpkin]: { gid: 160 },
    [CropName.Strawberry]: { gid: 170 },
    [CropName.Watermelon]: { gid: 180 },
}

export const cropNameMap: Record<CropId, CropName> = {
    [CropId.Carrot]: CropName.Carrot,
    //[CropId.Cabbage]: CropName.Cabbage,
    [CropId.BellPepper]: CropName.BellPepper,
    [CropId.Cucumber]: CropName.Cucumber,
    [CropId.Pineapple]: CropName.Pineapple,
    [CropId.Potato]: CropName.Potato,
    //[CropId.Pumpkin]: CropName.Pumpkin,
    //[CropId.Strawberry]: CropName.Strawberry,
    [CropId.Watermelon]: CropName.Watermelon,
}

export const getCropName = (cropId: CropId): CropName => {
    return cropNameMap[cropId]
}

// Interface for crop asset data
export interface CropAssetData {
  gid: number;
}

// Interface for the parameters to get the crop asset key
export interface CropAsset {
  cropName: CropName;
  growthStage: number;
}

// Function to load crop assets (images) for each crop and growth stage
export const loadCropAssets = (scene: Scene) => {
    const cropNames = Object.values(CropName)
    for (const cropName of cropNames) {
        for (let i = 0; i < NUM_GROWTH_STAGES; i++) {
            scene.load.image(
                getCropAssetKey({ cropName, growthStage: i }),
                `crops/${cropName}/${i + 1}.png`
            )
        }
    }
}

// Function to get the asset key for a crop and its growth stage
export const getCropAssetKey = ({
    cropName,
    growthStage,
}: CropAsset): string => {
    // Use the cropName and growthStage to build a unique key for the crop asset
    return `${cropName}-${growthStage}`
}

// Function to get the GID for a specific crop and its growth stage
export const getCropTilesetGid = ({
    cropName,
    growthStage,
}: CropAsset): number => {
    // Fetch the crop data from the crop map
    const cropData = cropAssetDataMap[cropName]
    if (!cropData) {
        throw new Error(`Crop not found: ${cropName}`)
    }
    // Optionally, you can modify the GID based on the growth stage if necessary
    // For example, you can return the same GID for all stages, or modify it based on the stage
    return cropData.gid + growthStage // You can adjust this logic as needed
}
