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
export const cropMap: Record<CropName, CropAssetData> = {
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
    for (const cropName in CropName) {
        const crop = CropName[cropName as keyof typeof CropName]
        for (let i = 0; i < NUM_GROWTH_STAGES; i++) {
            scene.load.image(getCropAssetKey({ cropName: crop, growthStage: i }), `crops/${crop}/${i + 1}.png`)
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
    const cropData = cropMap[cropName]
    if (!cropData) {
        throw new Error(`Crop not found: ${cropName}`)
    }
    // Optionally, you can modify the GID based on the growth stage if necessary
    // For example, you can return the same GID for all stages, or modify it based on the stage
    return cropData.gid + growthStage  // You can adjust this logic as needed
}
