import { Scene } from "phaser"
import { MapAssetData, ShopAssetData, MainVisualType } from "./types"
import { PetId } from "@/modules/entities"
import { loadSpine, loadTexture } from "./utils"

export interface PetAssetData {
    name: string;
    map: MapAssetData;
    shop?: ShopAssetData;
}

export const petAssetMap: Record<PetId, PetAssetData> = {
    [PetId.Dog]: {
        name: "Dog",
        map: { 
            mainVisualType: MainVisualType.Spine,
            spineConfig: {
                atlas: {
                    key: "pets-dog-atlas",
                    assetUrl: "pets/dog/spine/dog.atlas",
                    textureUrl: "pets/dog/spine/dog.png",
                    version: 3,
                },
                json: {
                    key: "pets-dog-json",
                    assetUrl: "pets/dog/spine/dog.json",
                    version: 2,
                },  
                extraOffsets: { x: 0, y: -80 },
            }   
        },
        shop: {
            textureConfig: {
                key: "pets-dog-shop",
                assetUrl: "pets/dog/shop.png",
                version: 1,
            },
        },
    },
    [PetId.Cat]: {
        name: "Cat",
        map: { 
            mainVisualType: MainVisualType.Spine,
            spineConfig: {
                atlas: {
                    key: "pets-cat-atlas",
                    assetUrl: "pets/cat/spine/cat.atlas",
                    textureUrl: "pets/cat/spine/cat.png",
                    version: 3,
                },
                json: {
                    key: "pets-cat-json",
                    assetUrl: "pets/cat/spine/cat.json",
                    version: 2,
                },
                extraOffsets: { x: 0, y: -80 },
            },
        },
        shop: {
            textureConfig: {
                key: "pets-cat-shop",
                assetUrl: "pets/cat/shop.png",
                version: 1,
            },
        },
    },
}

export const loadPetAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const petData of Object.values(petAssetMap)) {
        if (petData.shop) {
            promises.push(loadTexture(scene, petData.shop.textureConfig))
        }

        if (petData.map) {
            switch (petData.map.mainVisualType) {
            case MainVisualType.Spine: {
                if (!petData.map.spineConfig) {
                    throw new Error("Spine config is undefined")
                }
                promises.push(loadSpine(scene, petData.map.spineConfig))
                break
            }
            default: {
                if (!petData.map.textureConfig) {
                    throw new Error("Texture config is undefined")
                }
                promises.push(loadTexture(scene, petData.map.textureConfig))
                break
            }       
            }
        }
    }
    await Promise.all(promises)
}