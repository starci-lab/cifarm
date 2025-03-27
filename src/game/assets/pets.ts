import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { PetId } from "@/modules/entities"
import { fetchAsset } from "./fetch"

export interface PetAssetData {
    name: string;
    textureConfig: TextureConfig;
}

export const petAssetMap: Record<PetId, PetAssetData> = {
    [PetId.Dog]: {
        name: "Dog",
        textureConfig: { 
            key: "pets-dog", 
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/pets/dog.png" 
        },
    },
    [PetId.Cat]: {
        name: "Cat",
        textureConfig: { 
            key: "pets-cat", 
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/pets/cat.png" 
        },
    },
}

export const loadPetAssets = async (scene: Scene) => {
    for (const petData of Object.values(petAssetMap)) {
        if (petData.textureConfig.assetUrl) {
            await fetchAsset({
                key: petData.textureConfig.key,
                assetUrl: petData.textureConfig.assetUrl,
                scene,
            })
        }
    }
}