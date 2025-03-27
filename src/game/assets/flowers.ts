// Flower Assets Loading (Fixed with proper configurations for TilesetConfig, TextureConfig, and ExtraOffsets)
import { FlowerId } from "@/modules/entities"
import { Scene } from "phaser"
import { ShopAssetData, TextureConfig } from "./types"
import { loadTexture } from "./utils"

// Flower Asset Data Interface
export interface FlowerStageAssetData {
  textureConfig: TextureConfig;
}

export interface FlowerAssetData {
  map: Record<number, FlowerStageAssetData>;
  name: string;
  shop?: ShopAssetData;
}

// Flower asset data map with the GID and asset URL for each flower using FlowerId as the key
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
                key: "flowers-daisy-shop",
                assetUrl: "flowers/daisy/seed.png",
                extraOffsets: {
                    x: 0,
                    y: -45,
                },
            },
        },
    },
}

// Function to load all flower assets
export const loadFlowerAssets = async (scene: Scene) => {
    // Load all flower assets
    for (const flowerData of Object.values(flowerAssetMap)) {
        // Load shop asset if exists
        if (flowerData.shop) {
            await loadTexture(scene, flowerData.shop.textureConfig)
        }

        // Load all stage assets
        for (const stageData of Object.values(flowerData.map)) {
            if (stageData.textureConfig) {
                await loadTexture(scene, stageData.textureConfig)
            }
        }
    }
}
