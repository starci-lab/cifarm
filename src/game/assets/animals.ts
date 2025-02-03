import { AnimalId } from "@/modules/entities"
import { Scene } from "phaser"
import { ExtraOffsets } from "./types"

const BASE_DIR = "animals"
export interface AnimalAssetData {
  gid: number;
  dir: string;
  name: string;
  ages: Record<AnimalAge, AnimalAgeAssetData>;
}

// Crop Asset Data Interface
export interface AnimalAgeAssetData {
  offsets: ExtraOffsets;
  extension: string;
}

// Crop asset data map with the GID and asset URL for each crop using CropId as the key
export const animalAssetMap: Record<AnimalId, AnimalAssetData> = {
    [AnimalId.Cow]: {
        gid: 400,
        dir: "cow",
        name: "Cow",
        ages: {
            baby: { offsets: { x: 0, y: 0 }, extension: "png" },
            adult: { offsets: { x: 0, y: 0 }, extension: "png" },
        },
    },
    [AnimalId.Chicken]: {
        gid: 410,
        dir: "chicken",
        name: "Chicken",
        ages: {
            baby: { offsets: { x: 0, y: 0 }, extension: "png" },
            adult: { offsets: { x: 0, y: 0 }, extension: "png" },
        },
    },
    [AnimalId.Pig]: {
        gid: 420,
        dir: "pig",
        name: "Pig",
        ages: {
            baby: { offsets: { x: 0, y: 0 }, extension: "png" },
            adult: { offsets: { x: 0, y: 0 }, extension: "png" },
        },
    },
    [AnimalId.Sheep]: {
        gid: 430,
        dir: "sheep",
        name: "Sheep",
        ages: {
            baby: { offsets: { x: 0, y: 0 }, extension: "png" },
            adult: { offsets: { x: 0, y: 0 }, extension: "png" },
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
            scene.load.image(
                getAnimalAssetKey({ animalId, age }),
                `${BASE_DIR}/${animalData.dir}/${age}.${animalData.ages[age].extension}`
            )
        }
    })
}

export enum AnimalAge {
  Baby = "baby",
  Adult = "adult",
}

export interface GetAnimalAssetKeyParams {
  animalId: AnimalId;
  age: AnimalAge;
}

// Function to get the asset key for an animal
export const getAnimalAssetKey = ({
    animalId,
    age,
}: GetAnimalAssetKeyParams): string => {
    return `animals-${animalId}-${age}`
}

// Function to get the GID for a specific animal
export const getAnimalGid = ({ animalId, age }: GetAnimalGidParams): number => {
    // Fetch the crop data from the crop asset map
    const animalData = animalAssetMap[animalId]
    if (!animalData) {
        throw new Error(`Animal not found: ${animalId}`)
    }

    // You can optionally adjust the GID logic if needed (e.g., incrementing for each growth stage)
    return animalData.gid + (age === AnimalAge.Adult ? 1 : 0)
}

export type GetAnimalGidParams = GetAnimalAssetKeyParams;
