// Crop Assets Loading (Fixed with proper configurations for TilesetConfig, TextureConfig, and ExtraOffsets)
import { FlowerId } from "@/modules/entities"
import { Scene } from "phaser"
import { ShopAssetData, TextureConfig } from "./types"

// Crop Asset Data Interface
export interface FlowerStageAssetData {
  textureConfig: TextureConfig;
}

export interface FlowerAssetData {
  map: Record<number, FlowerStageAssetData>;
  name: string;
  shop?: ShopAssetData;
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const flowerAssetMap: Record<FlowerId, FlowerAssetData> = {
    [FlowerId.Daisy]: {
        name: "Daisy",
        map: {
            0: {
                textureConfig: {
                    key: "flowers-daisy-1",
                    assetUrl: "flowers/daisy/1.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "flowers-daisy-2",
                    assetUrl: "flowers/daisy/2.png",
                    extraOffsets: {
                        x: 0,
                        y: -45,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "flowers-daisy-3",
                    assetUrl: "flowers/daisy/3.png",
                    extraOffsets: {
                        x: 0,
                        y: -45,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "flowers-daisy-4",
                    assetUrl: "flowers/daisy/4.png",
                    extraOffsets: {
                        x: 0,
                        y: -45,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "flowers-daisy-5",
                    assetUrl: "flowers/daisy/5.png",
                    extraOffsets: {
                        x: 0,
                        y: -45,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "flowers-daisy-seed",
                assetUrl: "flowers/daisy/seed.png",
            },
        },
    },
}

// Function to load crop assets (images) for each crop and growth stage
export const loadFlowerAssets = (scene: Scene) => {
    Object.keys(flowerAssetMap).forEach((flowerId) => {
        const _flowerId = flowerId as FlowerId
        const flowerData = flowerAssetMap[_flowerId]

        if (!flowerData) {
            throw new Error(`Flower data not found for flowerId: ${flowerId}`)
        }
        // Load the seed asset
        if (flowerData.shop) {
            const { key, useExisting, assetUrl } = flowerData.shop.textureConfig
            if (!useExisting) {
                scene.load.image(key, assetUrl)
            }
        }

        // Load the asset for each growth stage
        for (const stage of Object.keys(flowerData.map)) {
            const stageData = flowerData.map[parseInt(stage)]
            const { key, assetUrl, useExisting } = stageData.textureConfig
            if (!useExisting) {
                scene.load.image(key, assetUrl)
            }
        }
    })
}
