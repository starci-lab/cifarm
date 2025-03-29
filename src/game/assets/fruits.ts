// Fruit Assets Loading (Fixed with proper configurations for TilesetConfig, TextureConfig, and ExtraOffsets)
import { FruitId } from "@/modules/entities"
import { Scene } from "phaser"
import {
    MapAssetData,
    TextureConfig,
    MainVisualType,
    ShopAssetData,
} from "./types"
import { loadTexture, loadSpine } from "./utils"

// Fruit Asset Data Interface
export interface FruitStageAssetData {
  textureConfig: TextureConfig;
}

export interface FruitAssetData {
  map: Record<number, MapAssetData>;
  name: string;
  shop?: ShopAssetData;
}

// Fruit asset data map with the GID and asset URL for each fruit using FruitId as the key
export const fruitAssetMap: Record<FruitId, FruitAssetData> = {
    [FruitId.Banana]: {
        name: "Banana",
        map: {
            0: {
                textureConfig: {
                    key: "fruit-banana-1",
                    assetUrl: "fruits/banana/1.png",
                    extraOffsets: {
                        x: -20,
                        y: -173,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "fruit-banana-2",
                    assetUrl: "fruits/banana/2.png",
                    extraOffsets: {
                        x: -10,
                        y: -175,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "fruit-banana-3",
                    assetUrl: "fruits/banana/3.png",
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "fruit-banana-4",
                    assetUrl: "fruits/banana/4.png",
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "fruit-banana-5",
                    assetUrl: "fruits/banana/5.png",
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "fruit-banana-shop",
                assetUrl: "fruits/banana/sapling.png",
                extraOffsets: {
                    x: 0,
                    y: -170,
                },
            },
        },
    },
    [FruitId.Apple]: {
        name: "Apple",
        map: {
            0: {
                textureConfig: {
                    key: "fruit-apple-1",
                    assetUrl: "fruits/apple/1.png",
                    extraOffsets: {
                        x: 0,
                        y: -190,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "fruit-apple-2",
                    assetUrl: "fruits/apple/2.png",
                    extraOffsets: {
                        x: 10,
                        y: -170,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "fruit-apple-3",
                    assetUrl: "fruits/apple/3.png",
                    extraOffsets: {
                        x: 0,
                        y: -150,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "fruit-apple-4",
                    assetUrl: "fruits/apple/4.png",
                    extraOffsets: {
                        x: 0,
                        y: -150,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "fruit-apple-5",
                    assetUrl: "fruits/apple/5.png",
                    extraOffsets: {
                        x: 0,
                        y: -150,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "fruit-apple-sapling",
                assetUrl: "fruits/apple/sapling.png",
            },
        },
    },
}

// Function to load all fruit assets
export const loadFruitAssets = async (scene: Scene) => {
    // Load all fruit assets
    const promises: Promise<void>[] = []
    for (const fruitData of Object.values(fruitAssetMap)) {
    // Load shop asset if exists
        if (fruitData.shop) {
            promises.push(loadTexture(scene, fruitData.shop.textureConfig))
        }

        // Load all stage assets
        for (const stageData of Object.values(fruitData.map)) {
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
