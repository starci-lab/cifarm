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
                textureConfig: { key: "animals-cow-baby", assetUrl: "animals/cow/baby.png" },
                tilesetConfig: { gid: 10001, tilesetName: "animals-cow-baby",
                    scaleTextureHeight: 0.8,
                    scaleTextureWidth: 0.8,
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: { key: "animals-cow-adult", assetUrl: "animals/cow/adult.png" },
                tilesetConfig: { gid: 10002, tilesetName: "animals-cow-adult" },
            },
        },
    },
    [AnimalId.Chicken]: {
        name: "Chicken",
        ages: {
            [AnimalAge.Baby]: {
                textureConfig: { key: "animals-chicken-baby", assetUrl: "animals/chicken/baby.png" },
                tilesetConfig: { gid: 10011, tilesetName: "animals-chicken-baby",
                    scaleTextureHeight: 0.8,
                    scaleTextureWidth: 0.8,
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: { key: "animals-chicken-adult", assetUrl: "animals/chicken/adult.png" },
                tilesetConfig: { gid: 10012, tilesetName: "animals-chicken-adult",
                    extraOffsets: { x: -20, y: -10 },
                },
            },
        },
    },
    [AnimalId.Pig]: {
        name: "Pig",
        ages: {
            [AnimalAge.Baby]: {
                textureConfig: { key: "animals-pig-baby", assetUrl: "animals/pig/baby.png" },
                tilesetConfig: { gid: 10022, tilesetName: "animals-pig-baby" },
            },
            [AnimalAge.Adult]: {
                textureConfig: { key: "animals-pig-adult", assetUrl: "animals/pig/adult.png" },
                tilesetConfig: { gid: 10023, tilesetName: "animals-pig-adult" },
            },
        },
    },
    [AnimalId.Sheep]: {
        name: "Sheep",
        ages: {
            [AnimalAge.Baby]: {
                textureConfig: { key: "animals-sheep-baby", assetUrl: "animals/sheep/baby.png" },
                tilesetConfig: { gid: 10031, tilesetName: "animals-sheep-baby" },
            },
            [AnimalAge.Adult]: {
                textureConfig: { key: "animals-sheep-adult", assetUrl: "animals/sheep/adult.png" },
                tilesetConfig: { gid: 10032, tilesetName: "animals-sheep-adult" },
            },
        },
    }
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
            const { key, assetUrl, useExisting } = animalData.ages[age].textureConfig
            if (useExisting) {
                continue
            }
            scene.load.image(key, assetUrl)
        }
    })
}

export const getAnimalIdFromKey = (tileKey: string): AnimalId | null => {
    for (const [animalId, animalData] of Object.entries(animalAssetMap)) {
        for (const ageData of Object.values(animalData.ages)) {
            if (ageData.textureConfig.key === tileKey) {
                return animalId as AnimalId
            }
        }
    }
    return null
}
