import { AnimalId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig, TilesetConfig } from "./types"

export enum AnimalAge {
  Baby = "baby",
  Adult = "adult",
}

export interface AnimalAgeAssetData {
  textureConfig: TextureConfig;
  tilesetConfig: TilesetConfig;
}

export interface AnimalAssetData {
  name: string;
  ages: Record<AnimalAge, AnimalAgeAssetData>;
}

export const animalAssetMap: Record<AnimalId, AnimalAssetData> = {
    [AnimalId.Cow]: {
        name: "Cow",
        ages: {
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
                },
                tilesetConfig: {
                    gid: 10001,
                    tilesetName: "animals-cow-baby",
                    scaleTextureHeight: 0.8,
                    scaleTextureWidth: 0.8,
                    extraOffsets: { x: 0, y: -20 },
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
                },
                tilesetConfig: {
                    gid: 10002,
                    tilesetName: "animals-cow-adult",
                    extraOffsets: { x: 0, y: -20 },
                },
            },
        },
    },
    [AnimalId.Chicken]: {
        name: "Chicken",
        ages: {
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
                },
                tilesetConfig: {
                    gid: 10011,
                    tilesetName: "animals-chicken-baby",
                    scaleTextureHeight: 0.8,
                    scaleTextureWidth: 0.8,
                    extraOffsets: { x: 0, y: -20 },
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
                },
                tilesetConfig: {
                    gid: 10012,
                    tilesetName: "animals-chicken-adult",
                    extraOffsets: { x: -0, y: -30 },
                },
            },
        },
    },
    [AnimalId.Pig]: {
        name: "Pig",
        ages: {
            [AnimalAge.Baby]: {
                textureConfig: {
                    key: "animals-pig-baby",
                    assetUrl: "animals/pig/baby.png",
                },
                tilesetConfig: { gid: 10022, tilesetName: "animals-pig-baby" },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    key: "animals-pig-adult",
                    assetUrl: "animals/pig/adult.png",
                },
                tilesetConfig: { gid: 10023, tilesetName: "animals-pig-adult" },
            },
        },
    },
    [AnimalId.Sheep]: {
        name: "Sheep",
        ages: {
            [AnimalAge.Baby]: {
                textureConfig: {
                    key: "animals-sheep-baby",
                    assetUrl: "animals/sheep/baby.png",
                },
                tilesetConfig: { gid: 10031, tilesetName: "animals-sheep-baby" },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    key: "animals-sheep-adult",
                    assetUrl: "animals/sheep/adult.png",
                },
                tilesetConfig: { gid: 10032, tilesetName: "animals-sheep-adult" },
            },
        },
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
            const { key, assetUrl, useExisting, spineConfig } = animalData.ages[age].textureConfig
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
            if (useExisting) {
                continue
            }
            scene.load.image(key, assetUrl)
        }
    })
}
