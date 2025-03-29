import { AnimalId } from "@/modules/entities"
import { Scene } from "phaser"
import { MainVisualType, MapAssetData, ShopAssetData } from "./types"
import { loadSpine, loadTexture } from "./utils"

export enum AnimalAge {
  Baby = "baby",
  Adult = "adult",
}

export interface AnimalAssetData {
  map: Record<AnimalAge, MapAssetData>;
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
                    extraOffsets: { x: 0, y: -80 },
                },
                mainVisualType: MainVisualType.Spine,
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
                    extraOffsets: { x: 0, y: -80 },
                },
                mainVisualType: MainVisualType.Spine,
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
                    extraOffsets: { x: 0, y: -80 },
                },
                mainVisualType: MainVisualType.Spine,
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
                    extraOffsets: { x: -0, y: -80 },
                },
                mainVisualType: MainVisualType.Spine,
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
    const promises: Array<Promise<void>> = []
    for (const animalData of Object.values(animalAssetMap)) {
        if (animalData.shop) {
            if (!animalData.shop.textureConfig) {
                throw new Error("Texture config is undefined")
            }
            promises.push(loadTexture(scene, animalData.shop.textureConfig))
        }
        for (const stageData of Object.values(animalData.map)) {
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
