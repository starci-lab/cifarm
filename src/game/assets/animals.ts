import { AnimalId } from "@/modules/entities"
import { Scene } from "phaser"
import { ShopAssetData, TextureConfig } from "./types"
import { fetchAsset } from "./fetch"

export enum AnimalAge {
  Baby = "baby",
  Adult = "adult",
}

export interface AnimalStageAssetData {
  textureConfig: TextureConfig;
}

export interface AnimalAssetData {
  map: Record<AnimalAge, AnimalStageAssetData>;
  name: string;
  shop?: ShopAssetData;
}

export const animalAssetMap: Record<AnimalId, AnimalAssetData> = {
    [AnimalId.Cow]: {
        name: "Cow",
        map: {
            [AnimalAge.Baby]: {
                textureConfig: {
                    key: "animals-cow-baby",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/animals/cow/baby/baby.png",
                    spineConfig: {
                        atlas: {
                            key: "animals-cow-baby-atlas",
                            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/animals/cow/baby/spine/baby.atlas",
                        },
                        json: {
                            key: "animals-cow-baby-json",
                            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/animals/cow/baby/spine/baby.json",
                        },
                    },
                    extraOffsets: { x: 0, y: -30 },
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    key: "animals-cow-adult",
                    assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/animals/cow/adult/adult.png",
                    spineConfig: {
                        atlas: {
                            key: "animals-cow-adult-atlas",
                            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/animals/cow/adult/spine/adult.atlas",
                        },
                        json: {
                            key: "animals-cow-adult-json",
                            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/animals/cow/adult/spine/adult.json",
                        },
                    },
                    extraOffsets: { x: 0, y: -30 },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "animals-cow-shop",
                assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/animals/cow/shop.png",
                extraOffsets: { x: 0, y: -30 },
            },
        },
    },
    [AnimalId.Chicken]: {
        name: "Chicken",
        map: {
            [AnimalAge.Baby]: {
                textureConfig: {
                    key: "animals-chicken-baby",
                    assetUrl: "animals/chicken/baby/baby.png",
                    spineConfig: {
                        atlas: {
                            key: "animals-chickenbaby-atlas",
                            assetUrl: "animals/chicken/baby/spine/baby.atlas",
                        },
                        json: {
                            key: "animals-chickenbaby-json",
                            assetUrl: "animals/chicken/baby/spine/baby.json",
                        },
                    },
                    extraOffsets: { x: 0, y: -40 },
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    key: "animals-chicken-adult",
                    assetUrl: "animals/chicken/adult/adult.png",
                    spineConfig: {
                        atlas: {
                            key: "animals-chicken-adult-atlas",
                            assetUrl: "animals/chicken/adult/spine/adult.atlas",
                        },
                        json: {
                            key: "animals-chicken-adult-json",
                            assetUrl: "animals/chicken/adult/spine/adult.json",
                        },
                    },
                    extraOffsets: { x: -0, y: -30 },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "animals-chicken-adult",
                useExisting: true,
            }
        }
    },
    [AnimalId.Pig]: {
        name: "Pig",
        map: {
            [AnimalAge.Baby]: {
                textureConfig: {
                    key: "animals-pig-baby",
                    assetUrl: "animals/pig/baby.png",
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    key: "animals-pig-adult",
                    assetUrl: "animals/pig/adult.png",
                },
            },
        },
        shop: {
            textureConfig: {
                key: "animals-pig-adult",
                useExisting: true,
            }
        }
    },
    [AnimalId.Sheep]: {
        name: "Sheep",
        map: {
            [AnimalAge.Baby]: {
                textureConfig: {
                    key: "animals-sheep-baby",
                    assetUrl: "animals/sheep/baby.png",
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    key: "animals-sheep-adult",
                    assetUrl: "animals/sheep/adult.png",
                },
            },
        },
        shop: {
            textureConfig: {
                key: "animals-sheep-adult",
                useExisting: true,
            }
        }
    },
}

export const loadAnimalAssets = async (scene: Scene) => {
    for (const animalData of Object.values(animalAssetMap)) {
        if (animalData.shop) {
            const { key, assetUrl, useExisting } = animalData.shop.textureConfig
            if (!useExisting) {
                if (!assetUrl) {
                    throw new Error("Asset URL not found")
                }
                await fetchAsset({
                    key,
                    assetUrl,
                    scene,
                })
            }

            for (const stageData of Object.values(animalData.map)) {
                if (stageData.textureConfig) {
                    const { key, assetUrl, useExisting } = stageData.textureConfig
                    if (!useExisting) {
                        if (!assetUrl) {
                            throw new Error("Asset URL not found")
                        }
                        await fetchAsset({
                            key,
                            assetUrl,
                            scene,
                        })
                    }
                }

                if (stageData.textureConfig.spineConfig) {
                        const { atlas, json } = stageData.textureConfig.spineConfig
                    if (!atlas.useExisting) {
                        if (!atlas.assetUrl) {
                            throw new Error("Asset URL not found")
                        }
                        await fetchAsset({
                            key: atlas.key,
                            assetUrl: atlas.assetUrl,
                            scene,
                        })
                    }
                }
            }
        }
    }
}
