import { PetId } from "@/modules/entities"
import { Scene } from "phaser"
import { TextureConfig } from "./types"

export interface PetAssetData {
    name: string;
    textureConfig: TextureConfig;
}

export const petAssetMap: Record<PetId, PetAssetData> = {
    [PetId.Dog]: {
        name: "Dog",
        textureConfig: { key: "pets-dog", assetUrl: "pets/dog.png" },
    },
    [PetId.Cat]: {
        name: "Cat",
        textureConfig: { key: "pets-cat", assetUrl: "pets/cat.png" },
    },
}

// Function to load animal assets in Phaser scene
export const loadPetAssets = (scene: Scene) => {
    Object.keys(petAssetMap).forEach((petId) => {
        const _petId = petId as PetId
        const petData = petAssetMap[_petId]

        if (!petData) {
            throw new Error(`Pet asset data not found for petId: ${petId}`)
        }

        const { key, assetUrl, useExisting } = petData.textureConfig
        if (useExisting) {
            return
        }
        scene.load.image(key, assetUrl)
    })
}