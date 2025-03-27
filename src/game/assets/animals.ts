import { AnimalId } from "@/modules/entities"
import { Scene } from "phaser"
import { ShopAssetData, SpineConfig } from "./types"
import { loadSpine, loadTexture } from "./utils"

export enum AnimalAge {
  Baby = "baby",
  Adult = "adult",
}

export interface AnimalStageAssetData {
  spineConfig?: SpineConfig;
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
                spineConfig: {
                    atlas: {
                        key: "animals-cow-baby-atlas",
                        assetUrl: "animals/cow/baby/spine/baby.atlas",
                        textureUrl: "animals/cow/baby/spine/baby.png",
                    },
                    json: {
                        key: "animals-cow-baby-json",
                        assetUrl: "animals/cow/baby/spine/baby.json",
                    },
                    extraOffsets: { x: 0, y: -30 },
                },
            },
            [AnimalAge.Adult]: {
                spineConfig: {
                    atlas: {
                        key: "animals-cow-adult-atlas",
                        assetUrl: "animals/cow/adult/spine/adult.atlas",
                        textureUrl: "animals/cow/adult/spine/adult.png",
                    },
                    json: {
                        key: "animals-cow-adult-json",
                        assetUrl: "animals/cow/adult/spine/adult.json",
                    },
                    extraOffsets: { x: 0, y: -30 },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "animals-cow-shop",
                assetUrl: "animals/cow/shop.png",
            },
        },
    },
    [AnimalId.Chicken]: {
        name: "Chicken",
        map: {
            [AnimalAge.Baby]: {
                spineConfig: {
                    atlas: {
                        key: "animals-chicken-baby-atlas",
                        assetUrl: "animals/chicken/baby/spine/baby.atlas",
                        textureUrl: "animals/chicken/baby/spine/baby.png",
                    },
                    json: {
                        key: "animals-chicken-baby-json",
                        assetUrl: "animals/chicken/baby/spine/baby.json",
                    },
                    extraOffsets: { x: 0, y: -40 },
                },
            },
            [AnimalAge.Adult]: {
                spineConfig: {
                    atlas: {
                        key: "animals-chicken-adult-atlas",
                        assetUrl: "animals/chicken/adult/spine/adult.atlas",
                        textureUrl: "animals/chicken/adult/spine/adult.png",
                    },
                    json: {
                        key: "animals-chicken-adult-json",
                        assetUrl: "animals/chicken/adult/spine/adult.json",
                    },
                    extraOffsets: { x: -0, y: -30 },
                },
            },
        },
        shop: {
            textureConfig: {
                key: "animals-chicken-shop",
                assetUrl: "animals/chicken/shop.png",
            },
        },
    },
}

export const loadAnimalAssets = async (scene: Scene) => {
    const promises: Promise<void>[] = []
    for (const animalData of Object.values(animalAssetMap)) {
        if (animalData.shop) {
            promises.push(loadTexture(scene, animalData.shop.textureConfig))
        }
        for (const stageData of Object.values(animalData.map)) {
            if (stageData.spineConfig) {
                promises.push(loadSpine(scene, stageData.spineConfig))
            }
        }
    }
    await Promise.all(promises)
}
