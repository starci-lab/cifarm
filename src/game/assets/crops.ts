// Crop Assets Loading (Fixed with proper configurations for TilesetConfig, TextureConfig, and ExtraOffsets)
import { CropId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig, TilesetConfig } from "./types"

// Number of growth stages for each crop
export const NUM_GROWTH_STAGES = 5

// Crop Asset Data Interface
export interface CropStageAssetData {
  textureConfig: TextureConfig;
  tilesetConfig: TilesetConfig; // TilesetConfig optional, can be used for additional offsets and other info
}

export interface SeedAssetData {
  textureConfig: TextureConfig;
}

export interface CropAssetData {
  stages: Record<number, CropStageAssetData>;
  name: string;
  textureConfig: TextureConfig;
  seed: SeedAssetData;
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const cropAssetMap: Record<CropId, CropAssetData> = {
    [CropId.Carrot]: {
        name: "Carrot",
        stages: {
            0: {
                textureConfig: { key: "crop-carrot-1", assetUrl: "crops/carrot/1.png" },
                tilesetConfig: {
                    gid: 1001,
                    tilesetName: "crop-carrot-0",
                },
            },
            1: {
                textureConfig: { key: "crop-carrot-2", assetUrl: "crops/carrot/2.png" },
                tilesetConfig: {
                    gid: 1002,
                    tilesetName: "crop-carrot-2",
                },
            },
            2: {
                textureConfig: { key: "crop-carrot-3", assetUrl: "crops/carrot/3.png" },
                tilesetConfig: {
                    gid: 1003,
                    tilesetName: "crop-carrot-3",
                },
            },
            3: {
                textureConfig: { key: "crop-carrot-4", assetUrl: "crops/carrot/4.png" },
                tilesetConfig: {
                    gid: 1004,
                    tilesetName: "crop-carrot-4",
                },
            },
            4: {
                textureConfig: { key: "crop-carrot-5", assetUrl: "crops/carrot/5.png" },
                tilesetConfig: {
                    gid: 1005,
                    tilesetName: "crop-carrot-5",
                },
            },
        },
        seed: {
            textureConfig: { key: "crop-carrot-seed", assetUrl: "crops/carrot/seed.png" },
        },
        textureConfig: { key: "crop-carrot", assetUrl: "crops/carrot/base.png" },
    },
    [CropId.BellPepper]: {
        name: "Bell Pepper",
        stages: {
            0: {
                textureConfig: { key: "crop-bell-pepper-1", assetUrl: "crops/bell-pepper/1.png" },
                tilesetConfig: {
                    gid: 1011,
                    tilesetName: "crop-bell-pepper-0",
                },
            },
            1: {
                textureConfig: { key: "crop-bell-pepper-1", assetUrl: "crops/bell-pepper/2.png" },
                tilesetConfig: {
                    gid: 1012,
                    tilesetName: "crop-bell-pepper-1",
                },
            },
            2: {
                textureConfig: { key: "crop-bell-pepper-2", assetUrl: "crops/bell-pepper/3.png" },
                tilesetConfig: {
                    gid: 1013,
                    tilesetName: "crop-bell-pepper-2",
                },
            },
            3: {
                textureConfig: { key: "crop-bell-pepper-3", assetUrl: "crops/bell-pepper/4.png" },
                tilesetConfig: {
                    gid: 1014,
                    tilesetName: "crop-bell-pepper-3",
                },
            },
            4: {
                textureConfig: { key: "crop-bell-pepper-4", assetUrl: "crops/bell-pepper/5.png" },
                tilesetConfig: {
                    gid: 1015,
                    tilesetName: "crop-bell-pepper-4",
                },
            },
        },
        seed: {
            textureConfig: { key: "crop-bell-pepper-seed", assetUrl: "crops/bell-pepper/seed.png" },
        },
        textureConfig: { key: "crop-bell-pepper", assetUrl: "crops/bell-pepper/base.png" },
    },
    // Add other crops like Cucumber, Potato, etc. here with similar structure...
    [CropId.Cucumber]: {
        name: "Cucumber",
        stages: {
            0: {
                textureConfig: { key: "crop-cucumber-1", assetUrl: "crops/cucumber/1.png" },
                tilesetConfig: {
                    gid: 1021,
                    tilesetName: "crop-cucumber-0",
                },
            },
            1: {
                textureConfig: { key: "crop-cucumber-1", assetUrl: "crops/cucumber/2.png" },
                tilesetConfig: {
                    gid: 1022,
                    tilesetName: "crop-cucumber-1",
                },
            },
            2: {
                textureConfig: { key: "crop-cucumber-2", assetUrl: "crops/cucumber/3.png" },
                tilesetConfig: {
                    gid: 1023,
                    tilesetName: "crop-cucumber-2",
                },
            },
            3: {
                textureConfig: { key: "crop-cucumber-3", assetUrl: "crops/cucumber/4.png" },
                tilesetConfig: {
                    gid: 1024,
                    tilesetName: "crop-cucumber-3",
                },
            },
            4: {
                textureConfig: { key: "crop-cucumber-4", assetUrl: "crops/cucumber/5.png" },
                tilesetConfig: {
                    gid: 1025,
                    tilesetName: "crop-cucumber-4",
                },
            },
        },
        seed: {
            textureConfig: { key: "crop-cucumber-seed", assetUrl: "crops/cucumber/seed.png" },
        },
        textureConfig: { key: "crop-cucumber", assetUrl: "crops/cucumber/base.png" },
    },
    [CropId.Potato]: {
        name: "Potato",
        stages: {
            0: {
                textureConfig: { key: "crop-potato-1", assetUrl: "crops/potato/1.png" },
                tilesetConfig: {
                    gid: 1031,
                    tilesetName: "crop-potato-0",
                },
            },
            1: {
                textureConfig: { key: "crop-potato-1", assetUrl: "crops/potato/2.png" },
                tilesetConfig: {
                    gid: 1032,
                    tilesetName: "crop-potato-1",
                },
            },
            2: {
                textureConfig: { key: "crop-potato-2", assetUrl: "crops/potato/3.png" },
                tilesetConfig: {
                    gid: 1033,
                    tilesetName: "crop-potato-2",
                },
            },
            3: {
                textureConfig: { key: "crop-potato-3", assetUrl: "crops/potato/4.png" },
                tilesetConfig: {
                    gid: 1034,
                    tilesetName: "crop-potato-3",
                },
            },
            4: {
                textureConfig: { key: "crop-potato-4", assetUrl: "crops/potato/5.png" },
                tilesetConfig: {
                    gid: 1035,
                    tilesetName: "crop-potato-4",
                },
            },
        },
        seed: {
            textureConfig: { key: "crop-potato-seed", assetUrl: "crops/potato/seed.png" },
        },
        textureConfig: { key: "crop-potato", assetUrl: "crops/potato/base.png" },
    },
    [CropId.Pineapple]: {
        name: "Pineapple",
        stages: {
            0: {
                textureConfig: { key: "crop-pineapple-1", assetUrl: "crops/pineapple/1.png" },
                tilesetConfig: {
                    gid: 1041,
                    tilesetName: "crop-pineapple-0",
                },
            },
            1: {
                textureConfig: { key: "crop-pineapple-1", assetUrl: "crops/pineapple/2.png" },
                tilesetConfig: {
                    gid: 1042,
                    tilesetName: "crop-pineapple-1",
                },
            },
            2: {
                textureConfig: { key: "crop-pineapple-2", assetUrl: "crops/pineapple/3.png" },
                tilesetConfig: {
                    gid: 1043,
                    tilesetName: "crop-pineapple-2",
                },
            },
            3: {
                textureConfig: { key: "crop-pineapple-3", assetUrl: "crops/pineapple/4.png" },
                tilesetConfig: {
                    gid: 1044,
                    tilesetName: "crop-pineapple-3",
                },
            },
            4: {
                textureConfig: { key: "crop-pineapple-4", assetUrl: "crops/pineapple/5.png" },
                tilesetConfig: {
                    gid: 1045,
                    tilesetName: "crop-pineapple-4",
                },
            },
        },
        seed: {
            textureConfig: { key: "crop-pineapple-seed", assetUrl: "crops/pineapple/seed.png" },
        },
        textureConfig: { key: "crop-pineapple", assetUrl: "crops/pineapple/base.png" },
    },
    [CropId.Watermelon]: {
        name: "Watermelon",
        stages: {
            0: {
                textureConfig: { key: "crop-watermelon-1", assetUrl: "crops/watermelon/1.png" },
                tilesetConfig: {
                    gid: 1051,
                    tilesetName: "crop-watermelon-0",
                },
            },
            1: {
                textureConfig: { key: "crop-watermelon-1", assetUrl: "crops/watermelon/2.png" },
                tilesetConfig: {
                    gid: 1052,
                    tilesetName: "crop-watermelon-1",
                },
            },
            2: {
                textureConfig: { key: "crop-watermelon-2", assetUrl: "crops/watermelon/3.png" },
                tilesetConfig: {
                    gid: 1053,
                    tilesetName: "crop-watermelon-2",
                },
            },
            3: {
                textureConfig: { key: "crop-watermelon-3", assetUrl: "crops/watermelon/4.png" },
                tilesetConfig: {
                    gid: 1054,
                    tilesetName: "crop-watermelon-3",
                },
            },
            4: {
                textureConfig: { key: "crop-watermelon-4", assetUrl: "crops/watermelon/5.png" },
                tilesetConfig: {
                    gid: 1055,
                    tilesetName: "crop-watermelon-4",
                },
            },
        },
        seed: {
            textureConfig: { key: "crop-watermelon-seed", assetUrl: "crops/watermelon/seed.png" },
        },
        textureConfig: { key: "crop-watermelon", assetUrl: "crops/watermelon/base.png" },
    }
}

// Function to load crop assets (images) for each crop and growth stage
export const loadCropAssets = (scene: Scene) => {
    Object.keys(cropAssetMap).forEach((cropId) => {
        const _cropId = cropId as CropId
        const cropData = cropAssetMap[_cropId]

        if (!cropData) {
            throw new Error(`Crop data not found for cropId: ${cropId}`)
        }

        // Load the base crop asset
        scene.load.image(cropData.textureConfig.key, cropData.textureConfig.assetUrl)

        // Load the seed asset
        scene.load.image(cropData.seed.textureConfig.key, cropData.seed.textureConfig.assetUrl)

        // Load the asset for each growth stage
        for (const stage of Object.keys(cropData.stages)) {
            const stageData = cropData.stages[parseInt(stage)]
            const { key, assetUrl, useExisting } = stageData.textureConfig
            if (useExisting) {
                continue
            }
            scene.load.image(key, assetUrl)
        }
    })
}
