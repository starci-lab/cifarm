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
  nft?: Record<number, MapAssetData>;
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
                version: 1,
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
                version: 1,
            },
        },
    },
    [FruitId.DragonFruit]: {
        name: "Dragon Fruit",
        map: {
            0: {
                textureConfig: {
                    key: "fruit-dragon-fruit-1",
                    assetUrl: "fruits/dragon-fruit/1.png",
                    packageId: 1,
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "fruit-dragon-fruit-2",
                    assetUrl: "fruits/dragon-fruit/2.png",
                    packageId: 1,
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "fruit-dragon-fruit-3",
                    assetUrl: "fruits/dragon-fruit/3.png",
                    packageId: 1,
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "fruit-dragon-fruit-4",
                    assetUrl: "fruits/dragon-fruit/4.png",
                    packageId: 1,
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "fruit-dragon-fruit-5",
                    assetUrl: "fruits/dragon-fruit/5.png",
                    packageId: 1,
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
        },
        nft: {
            0: {
                textureConfig: {
                    key: "fruit-dragon-fruit-1",
                    useExisting: true,
                },
            },
            1: {
                textureConfig: {
                    key: "fruit-dragon-fruit-2",
                    useExisting: true,
                },
            },
            2: {
                textureConfig: {
                    key: "fruit-dragon-fruit-3",
                    useExisting: true,
                },
            },
            3: {
                textureConfig: {
                    key: "fruit-dragon-fruit-4",
                    useExisting: true,
                },
            },
            4: {
                textureConfig: {
                    key: "fruit-dragon-fruit-5",
                    useExisting: true,
                },
            },      
        },
    },
    [FruitId.Jackfruit]: {
        name: "Jackfruit",
        map: {
            0: {
                textureConfig: {
                    key: "fruit-jackfruit-1",
                    assetUrl: "fruits/jackfruit/1.png",
                    packageId: 1,
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "fruit-jackfruit-2",
                    assetUrl: "fruits/jackfruit/2.png",
                    packageId: 1,
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "fruit-jackfruit-3",
                    assetUrl: "fruits/jackfruit/3.png",
                    packageId: 1,
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "fruit-jackfruit-4",
                    assetUrl: "fruits/jackfruit/4.png",
                    packageId: 1,
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "fruit-jackfruit-5",
                    assetUrl: "fruits/jackfruit/5.png",
                    packageId: 1,
                    extraOffsets: {
                        x: 0,
                        y: -170,
                    },
                },
            },
        },
        nft: {
            0: {
                textureConfig: {
                    key: "fruit-jackfruit-1",
                    useExisting: true,
                },
            },
            1: {
                textureConfig: {
                    key: "fruit-jackfruit-2",
                    useExisting: true,
                },
            },
            2: {
                textureConfig: {
                    key: "fruit-jackfruit-3",
                    useExisting: true,
                },
            },
            3: {
                textureConfig: {
                    key: "fruit-jackfruit-4",
                    useExisting: true,
                },
            },
            4: {
                textureConfig: {
                    key: "fruit-jackfruit-5",
                    useExisting: true,
                },
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
