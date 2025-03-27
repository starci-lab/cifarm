import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { PetId } from "@/modules/entities"
import { loadTexture } from "./utils"

export interface PetAssetData {
    name: string;
    textureConfig: TextureConfig;
}

export const petAssetMap: Record<PetId, PetAssetData> = {
    [PetId.Dog]: {
        name: "Dog",
        textureConfig: { 
            key: "pets-dog", 
            assetUrl: "pets/dog.png" 
        },
    },
    [PetId.Cat]: {
        name: "Cat",
        textureConfig: { 
            key: "pets-cat", 
            assetUrl: "pets/cat.png" 
        },
    },
}

export const loadPetAssets = async (scene: Scene) => {
    const promises: Promise<void>[] = []
    for (const petData of Object.values(petAssetMap)) {
        if (petData.textureConfig) {
            promises.push(loadTexture(scene, petData.textureConfig))
        }
    }
    await Promise.all(promises)
}