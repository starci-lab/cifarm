import { AnimalId } from "@/modules/entities"
import { Scene } from "phaser"
import { ShopAssetData, TextureConfig } from "./types"

export enum AnimalAge {
  Baby = "baby",
  Adult = "adult",
}

export interface AnimalMapAssetData {
  textureConfig: TextureConfig;
}

export interface AnimalAssetData {
  name: string;
  map: Record<AnimalAge, AnimalMapAssetData>;
  shop?: ShopAssetData;
}

export const animalAssetMap: Record<AnimalId, AnimalAssetData> = {
    [AnimalId.Cow]: {
        name: "Cow",
        map: {
            [AnimalAge.Baby]: {
                textureConfig: {
                    key: "animals-cow-baby",
                    assetUrl: "animals/cow/baby/baby.png",
                    spineConfig: {
                        atlas: {
                            key: "animals-cow-baby-atlas",
                            assetUrl: "animals/cow/baby/spine/baby.atlas",
                        },
                        json: {
                            key: "animals-cow-baby-json",
                            assetUrl: "animals/cow/baby/spine/baby.json",
                        },
                    },
                    extraOffsets: { x: 0, y: -30 },
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    key: "animals-cow-adult",
                    assetUrl: "animals/cow/adult/adult.png",
                    spineConfig: {
                        atlas: {
                            key: "animals-cow-adult-atlas",
                            assetUrl: "animals/cow/adult/spine/adult.atlas",
                        },
                        json: {
                            key: "animals-cow-adult-json",
                            assetUrl: "animals/cow/adult/spine/adult.json",
                        },
                    },
                    extraOffsets: { x: 0, y: -28 },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "animals-cow-adult",
                useExisting: true,
            },
        }
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

// Function to load animal assets in Phaser scene
export const loadAnimalAssets = (scene: Scene) => {
    Object.keys(animalAssetMap).forEach((animalId) => {
        const _animalId = animalId as AnimalId
        const animalData = animalAssetMap[_animalId]

        if (!animalData) {
            throw new Error(`Animal asset data not found for animalId: ${animalId}`)
        }

        for (const age of Object.values(AnimalAge)) {
            const { key, assetUrl, useExisting, spineConfig } = animalData.map[age].textureConfig
            if (spineConfig) {
                scene.load.spineJson(
                    spineConfig.json.key,
                    spineConfig.json.assetUrl
                )
                scene.load.spineAtlas(
                    spineConfig.atlas.key,
                    spineConfig.atlas.assetUrl
                )
            }
            if (!useExisting) {
                scene.load.image(key, assetUrl)
            }    
        }

        if (animalData.shop) {
            const { key, useExisting, assetUrl } = animalData.shop.textureConfig
            if (!useExisting) {
                scene.load.image(key, assetUrl)
            }
        }
    })
}
