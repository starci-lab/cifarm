// Flower Assets Loading (Fixed with proper configurations for TilesetConfig, TextureConfig, and ExtraOffsets)
import { FlowerId } from "@/modules/entities"
import { Scene } from "phaser"
import { MapAssetData, TextureConfig, MainVisualType, ShopAssetData } from "./types"
import { loadTexture, loadSpine } from "./utils"

// Flower Asset Data Interface
export interface FlowerStageAssetData {
  textureConfig: TextureConfig;
}

export interface FlowerAssetData {
    map: Record<number, MapAssetData>;
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
    const promises: Promise<void>[] = []
    // Load all flower assets
    for (const flowerData of Object.values(flowerAssetMap)) {
        // Load shop asset if exis
        if (flowerData.shop) {
            promises.push(loadTexture(scene, flowerData.shop.textureConfig))
        }
        
        // Load all stage assets
        for (const stageData of Object.values(flowerData.map)) {
            switch (stageData.mainVisualType) {
            case MainVisualType.Spine: {
                if (!stageData.spineConfig) {
                    throw new Error("Spine config is undefined")
                }
                promises.push(loadSpine(scene, stageData.spineConfig))
                break
            }
            default: {
                if (!stageData.textureConfig) {
                    throw new Error("Texture config is undefined")
                }
                promises.push(loadTexture(scene, stageData.textureConfig))
                break
            }
            }
        }
    }
    await Promise.all(promises)
}
