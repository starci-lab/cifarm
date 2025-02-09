import { AnimalId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig, TilesetConfig } from "./types"

export enum AnimalAge {
    Baby = "baby",
    Adult = "adult",
}

export interface ProductAssetData {
    textureConfig: TextureConfig;
}

export interface AnimalAgeAssetData {
    textureConfig: TextureConfig;
    tilesetConfig: TilesetConfig;
}

export interface AnimalAssetData {
    name: string;
    ages: Record<AnimalAge, AnimalAgeAssetData>;
    product: ProductAssetData;
}

export const animalAssetMap: Record<AnimalId, AnimalAssetData> = {
    [AnimalId.Cow]: {
        name: "Cow",
        ages: {
            [AnimalAge.Baby]: {
                textureConfig: { key: "animals-cow-baby", assetUrl: "animals/cow/baby.png" },
                tilesetConfig: { gid: 10001, tilesetName: "animals-cow-baby" },
            },
            [AnimalAge.Adult]: {
                textureConfig: { key: "animals-cow-adult", assetUrl: "animals/cow/adult.png" },
                tilesetConfig: { gid: 10002, tilesetName: "animals-cow-adult" },
            },
        },
        product: {
            textureConfig: { key: "milk", assetUrl: "animals/cow/milk.png" }
        }
    },
    [AnimalId.Chicken]: {
        name: "Chicken",
        ages: {
            [AnimalAge.Baby]: {
                textureConfig: { key: "animals-chicken-baby", assetUrl: "animals/chicken/baby.png" },
                tilesetConfig: { gid: 10011, tilesetName: "animals-chicken-baby" },
            },
            [AnimalAge.Adult]: {
                textureConfig: { key: "animals-chicken-adult", assetUrl: "animals/chicken/adult.png" },
                tilesetConfig: { gid: 10012, tilesetName: "animals-chicken-adult" },
            },
        },
        product: {
            textureConfig: { key: "egg", assetUrl: "animals/chicken/egg.png" }
        }
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
        product: {
            textureConfig: { key: "meat", assetUrl: "animals/pig/pork.png" }
        }
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
        product: {
            textureConfig: { key: "wool", assetUrl: "animals/sheep/wool.png" }
        }
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
            const { key, assetUrl } = animalData.ages[age].textureConfig
            scene.load.image(key, assetUrl)
        }

        // Load animal product
        scene.load.image(animalData.product.textureConfig.key, animalData.product.textureConfig.assetUrl)
    })
}
