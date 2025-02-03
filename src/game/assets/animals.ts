// we use range of GID from 10001 - 12000 to represent different types of animals
import { AnimalId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig, TilesetConfig } from "./types"

export enum AnimalAge {
  Baby = "baby",
  Adult = "adult",
}

export interface AnimalAssetData {
  name: string;
  ages: Record<AnimalAge, AnimalAgeAssetData>;
}

// Crop Asset Data Interface
export interface AnimalAgeAssetData {
  textureConfig: TextureConfig;
  tilesetConfig: TilesetConfig;
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const animalAssetMap: Record<AnimalId, AnimalAssetData> = {
    [AnimalId.Cow]: {
        name: "Cow",
        ages: {
            [AnimalAge.Baby]: {
                textureConfig: {
                    key: "animals-cow-baby",
                    assetUrl: "animals/cow/baby.png",
                },
                tilesetConfig: {
                    gid: 10001,
                    tilesetName: "animals-cow-baby",
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    key: "animals-cow-adult",
                    assetUrl: "animals/cow/adult.png",
                },
                tilesetConfig: {
                    gid: 10002,
                    tilesetName: "animals-cow-adult",
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
                    assetUrl: "animals/chicken/baby.png",
                },
                tilesetConfig: {
                    gid: 10011,
                    tilesetName: "animals-chicken-baby",
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    key: "animals-chicken-adult",
                    assetUrl: "animals/chicken/adult.png",
                },
                tilesetConfig: {
                    gid: 10012,
                    tilesetName: "animals-chicken-adult",
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
                tilesetConfig: {
                    gid: 10022,
                    tilesetName: "animals-pig-baby",
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    key: "animals-pig-adult",
                    assetUrl: "animals/pig/adult.png",
                },
                tilesetConfig: {
                    gid: 10023,
                    tilesetName: "animals-pig-adult",
                },
            },
        },
    },
    [AnimalId.Sheep]: {
        name: "Sheep",
        ages: {
            [AnimalAge.Baby]: {
                textureConfig: {
                    assetUrl: "animals/sheep/baby.png",
                    key: "animals-sheep-baby",
                },
                tilesetConfig: {
                    gid: 10031,
                    tilesetName: "animals-sheep-baby",
                },
            },
            [AnimalAge.Adult]: {
                textureConfig: {
                    assetUrl: "animals/sheep/adult.png",
                    key: "animals-sheep-adult",
                },
                tilesetConfig: {
                    gid: 10032,
                    tilesetName: "animals-sheep-adult",
                },
            },
        },
    },
}

// Function to load animals assets (images) for each animal
export const loadAnimalAssets = (scene: Scene) => {
    // Iterate over each animalId in the animalAssetDataMap
    Object.keys(animalAssetMap).forEach((animalIdKey) => {
        const animalId = animalIdKey as AnimalId
        const animalData = animalAssetMap[animalId]

        if (!animalData) {
            throw new Error(`Animal data not found for animalId: ${animalId}`)
        }
        // Load animal assets (e.g., Cow baby and adult)
        for (const age of Object.values(AnimalAge)) {
            const { key, assetUrl } = animalData.ages[age].textureConfig
            scene.load.image(key, assetUrl)
        }
    })
}
