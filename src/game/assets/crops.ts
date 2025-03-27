// Crop Assets Loading (Fixed with proper configurations for TilesetConfig, TextureConfig, and ExtraOffsets)
import { CropId } from "@/modules/entities"
import { Scene } from "phaser"
import { ShopAssetData, TextureConfig } from "./types"
import { fetchAsset } from "./fetch"

// Crop Asset Data Interface
export interface CropStageAssetData {
  textureConfig: TextureConfig;
}

export interface CropAssetData {
  map: Record<number, CropStageAssetData>;
  name: string;
  shop?: ShopAssetData;
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const cropAssetMap: Record<CropId, CropAssetData> = {
    [CropId.Turnip]: {
        name: "Turnip",
        map: {
            0: {
                textureConfig: {
                    key: "crop-turnip-1",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/turnip/1.png",
                    extraOffsets: {
                        x: 0,
                        y: -60,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "crop-turnip-2",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/turnip/2.png",
                    extraOffsets: {
                        x: 0,
                        y: -90,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "crop-turnip-3",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/turnip/3.png",
                    extraOffsets: {
                        x: -10,
                        y: -90,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "crop-turnip-4",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/turnip/4.png",
                    extraOffsets: {
                        x: -10,
                        y: -80,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "crop-turnip-5",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/turnip/5.png",
                    extraOffsets: {
                        x: -10,
                        y: -70,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "crop-turnip-seed",
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/turnip/seed.png",
            },
        },
    },
    [CropId.Carrot]: {
        name: "Carrot",
        map: {
            0: {
                textureConfig: {
                    key: "crop-carrot-1",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/carrot/1.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "crop-carrot-2",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/carrot/2.png",
                    extraOffsets: {
                        x: 0,
                        y: -48,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "crop-carrot-3",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/carrot/3.png",
                    extraOffsets: {
                        x: 15,
                        y: -90,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "crop-carrot-4",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/carrot/4.png",
                    extraOffsets: {
                        x: 15,
                        y: -80,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "crop-carrot-5",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/carrot/5.png",
                    extraOffsets: {
                        x: 15,
                        y: -75,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "crop-carrot-seed",
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/carrot/seed.png",
            },
        },
    },
    [CropId.BellPepper]: {
        name: "Bell Pepper",
        map: {
            0: {
                textureConfig: {
                    key: "crop-bell-pepper-1",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/bell-pepper/1.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "crop-bell-pepper-2",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/bell-pepper/2.png",
                    extraOffsets: {
                        x: 10,
                        y: -15,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "crop-bell-pepper-3",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/bell-pepper/3.png",
                    extraOffsets: {
                        x: 20,
                        y: -20,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "crop-bell-pepper-4",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/bell-pepper/4.png",
                    extraOffsets: {
                        x: 20,
                        y: -25,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "crop-bell-pepper-5",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/bell-pepper/5.png",
                    extraOffsets: {
                        x: 15,
                        y: -40,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "crop-bell-pepper-seed",
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/bell-pepper/seed.png",
            },
        },
    },
    // Add other crops like Cucumber, Potato, etc. here with similar structure...
    [CropId.Cucumber]: {
        name: "Cucumber",
        map: {
            0: {
                textureConfig: {
                    key: "crop-cucumber-1",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/cucumber/1.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "crop-cucumber-2",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/cucumber/2.png",
                    extraOffsets: {
                        x: 0,
                        y: -60,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "crop-cucumber-3",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/cucumber/3.png",
                    extraOffsets: {
                        x: 20,
                        y: -60,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "crop-cucumber-4",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/cucumber/4.png",
                    extraOffsets: {
                        x: 20,
                        y: -60,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "crop-cucumber-5",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/cucumber/5.png",
                    extraOffsets: {
                        x: 0,
                        y: -60,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "crop-cucumber-seed",
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/cucumber/seed.png",
            },
        },
    },
    [CropId.Potato]: {
        name: "Potato",
        map: {
            0: {
                textureConfig: {
                    key: "crop-potato-1",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/potato/1.png",
                    extraOffsets: {
                        x: 0,
                        y: -90,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "crop-potato-2",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/potato/2.png",
                    extraOffsets: {
                        x: -10,
                        y: -90,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "crop-potato-3",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/potato/3.png",
                    extraOffsets: {
                        x: 0,
                        y: -50,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "crop-potato-4",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/potato/4.png",
                    extraOffsets: {
                        x: 0,
                        y: -50,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "crop-potato-5",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/potato/5.png",
                    extraOffsets: {
                        x: 0,
                        y: -70,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "crop-potato-seed",
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/potato/seed.png",
            },
        },
    },
    [CropId.Pineapple]: {
        name: "Pineapple",
        map: {
            0: {
                textureConfig: {
                    key: "crop-pineapple-1",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/pineapple/1.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "crop-pineapple-2",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/pineapple/2.png",
                    extraOffsets: {
                        x: 0,
                        y: -70,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "crop-pineapple-3",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/pineapple/3.png",
                    extraOffsets: {
                        x: -0,
                        y: -45,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "crop-pineapple-4",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/pineapple/4.png",
                    extraOffsets: {
                        x: -0,
                        y: -45,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "crop-pineapple-5",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/pineapple/5.png",
                    extraOffsets: {
                        x: -0,
                        y: -45,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "crop-pineapple-seed",
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/pineapple/seed.png",
            },
        },
    },
    [CropId.Watermelon]: {
        name: "Watermelon",
        map: {
            0: {
                textureConfig: {
                    key: "crop-watermelon-1",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/watermelon/1.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "crop-watermelon-1",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/watermelon/2.png",
                    extraOffsets: {
                        x: 5,
                        y: -40,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "crop-watermelon-2",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/watermelon/3.png",
                    extraOffsets: {
                        x: 5,
                        y: -40,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "crop-watermelon-3",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/watermelon/4.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "crop-watermelon-4",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/watermelon/5.png",
                    extraOffsets: {
                        x: 0,
                        y: -60,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "crop-watermelon-seed",
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/watermelon/seed.png",
            },
        },
    },
    [CropId.Strawberry]: {
        name: "Strawberry",
        map: {
            0: {
                textureConfig: {
                    key: "crop-strawberry-1",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/strawberry/1.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            1: {
                textureConfig: {
                    key: "crop-strawberry-2",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/strawberry/2.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            2: {
                textureConfig: {
                    key: "crop-strawberry-3",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/strawberry/3.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            3: {
                textureConfig: {
                    key: "crop-strawberry-4",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/strawberry/4.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
            4: {
                textureConfig: {
                    key: "crop-strawberry-5",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/strawberry/5.png",
                    extraOffsets: {
                        x: 0,
                        y: -30,
                    },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "crop-strawberry-seed",
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/crops/strawberry/seed.png",
            },
        },
    },
}

// Function to load crop assets (images) for each crop and growth stage
export const loadCropAssets = async (scene: Scene) => {
    // Load the asset for each growth stage
    const promises: Array<Promise<void>> = []
    for (const cropId of Object.keys(cropAssetMap)) {   
        const _cropId = cropId as CropId
        const cropData = cropAssetMap[_cropId]

        if (!cropData) {
            throw new Error(`Crop data not found for cropId: ${cropId}`)
        }
        // Load the seed asset
        if (cropData.shop) {
            const { key, useExisting, assetUrl, packageId } = cropData.shop.textureConfig
            if (!assetUrl) {
                throw new Error("Asset URL not found")
            }
            if (!useExisting) {
                fetchAsset({
                    key,
                    assetUrl,
                    packageId,
                    scene,
                })
            }
        }

        for (const stage of Object.keys(cropData.map)) {
            const stageData = cropData.map[parseInt(stage)]
            const { key, assetUrl, useExisting, packageId } = stageData.textureConfig
            if (!useExisting) {
                if (!assetUrl) {
                    throw new Error("Asset URL not found")
                }
                promises.push(
                    fetchAsset({
                        key,
                        assetUrl,
                        packageId,
                        scene,
                    })
                )
            }
        }
    }
    await Promise.all(promises)
}
