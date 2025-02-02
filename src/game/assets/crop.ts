import { CropId } from "@/modules/entities"
import { Scene } from "phaser"
import { ExtraOffsets } from "./types"

// base directory for crop assets
const BASE_DIR = "crops"
// name of the seed file
const SEED_FILE = "seed.png"
// Number of growth stages for each crop
export const NUM_GROWTH_STAGES = 5

// Crop Asset Data Interface
export interface CropStageAssetData {
  offsets: ExtraOffsets;
}

export interface CropAssetData {
  gid: number;
  dir: string;
  stages?: Record<number, CropStageAssetData>;
  name: string;
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const cropAssetMap: Record<CropId, CropAssetData> = {
    [CropId.Carrot]: {
        gid: 200,
        dir: "carrot",
        stages: {
            0: { offsets: { x: 0, y: 0 } },
            1: { offsets: { x: 0, y: 0 } },
            2: { offsets: { x: 0, y: 0 } },
            3: { offsets: { x: 0, y: 0 } },
            4: { offsets: { x: 0, y: -40 } },
        },
        name: "Carrot",
    },
    [CropId.BellPepper]: { gid: 210, dir: "bell-pepper", name: "Bell Pepper" },
    [CropId.Cucumber]: { gid: 220, dir: "cucumber", name: "Cucumber" },
    [CropId.Pineapple]: { gid: 230, dir: "pineapple", name: "Pineapple" },
    [CropId.Potato]: { gid: 240, dir: "potato", name: "Potato" },
    [CropId.Watermelon]: { gid: 250, dir: "watermelon", name: "Watermelon" },
}

// Function to load crop assets (images) for each crop and growth stage
export const loadCropAssets = (scene: Scene) => {
    // Iterate over each cropId in the cropAssetDataMap
    Object.keys(cropAssetMap).forEach((cropIdKey) => {
        const cropId = cropIdKey as CropId
        const cropData = cropAssetMap[cropId]

        if (!cropData) {
            throw new Error(`Crop data not found for cropId: ${cropId}`)
        }
        // Load crop growth stage assets (e.g., Carrot growth stages)
        for (let i = 0; i < NUM_GROWTH_STAGES; i++) {
            scene.load.image(
                getCropAssetKey({ cropId, growthStage: i }),
                `${BASE_DIR}/${cropData.dir}/${i + 1}.png` // Assuming growth stages are numbered 1, 2, 3, ...
            )
        }
        // Load the seed asset for the crop
        scene.load.image(
            getCropSeedAssetKey(cropId),
            `${BASE_DIR}/${cropData.dir}/${SEED_FILE}`
        )
    })
}

// Function to get the asset key for a crop seed
export const getCropSeedAssetKey = (cropId: CropId): string => {
    return `${cropId}-seed`
}

// Function to get the asset key for a crop and its growth stage
export const getCropAssetKey = ({
    cropId,
    growthStage,
}: GetCropAssetKeyParams): string => {
    // Use the cropId and growthStage to build a unique key for the crop asset
    return `${cropId}-${growthStage}`
}

// Function to get the GID for a specific crop and its growth stage
export const getCropGid = ({ cropId, growthStage }: GetCropGid): number => {
    // Fetch the crop data from the crop asset map
    const cropData = cropAssetMap[cropId]
    if (!cropData) {
        throw new Error(`Crop not found: ${cropId}`)
    }

    // You can optionally adjust the GID logic if needed (e.g., incrementing for each growth stage)
    return cropData.gid + growthStage
}

// Crop Asset Interface
export interface GetCropAssetKeyParams {
  cropId: CropId;
  growthStage: number;
}
export type GetCropGid = GetCropAssetKeyParams;
