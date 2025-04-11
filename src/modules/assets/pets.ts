import { PetId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, Metadata } from "./types"

export interface AssetPetData extends Metadata {
    phaser: {
        map: AssetMapData
    };
    base: AssetData
}

export const assetPetMap: Record<PetId, AssetPetData> = {
    [PetId.Dog]: {
        name: "Dog",
        description: "Loyal companion with playful nature.",
        phaser: {
            map: {
                type: AssetMapType.Spine,
                spine: {
                    atlas: {
                        key: "pets-dog-baby-atlas",
                        assetUrl: "pets/dog/baby/spine/baby.atlas",
                        textureUrl: "pets/dog/baby/spine/baby.png",
                    },
                    json: {
                        key: "pets-dog-baby-json",
                        assetUrl: "pets/dog/baby/spine/baby.json",
                    },
                    extraOffsets: { x: 0, y: -80 },
                },
            },
        },
        base: {
            assetKey: "pets-dog-baby",
            assetUrl: "pets/dog/baby/spine/baby.png",
        },
    },
    [PetId.Cat]: {
        name: "Cat",
        description: "Independent feline with graceful movements.",
        phaser: {
            map: {
                type: AssetMapType.Spine,
                spine: {
                    atlas: {
                        key: "pets-cat-baby-atlas",
                        assetUrl: "pets/cat/baby/spine/baby.atlas",
                        textureUrl: "pets/cat/baby/spine/baby.png",
                    },
                    json: {
                        key: "pets-cat-baby-json",
                        assetUrl: "pets/cat/baby/spine/baby.json",
                    },
                    extraOffsets: { x: 0, y: -80 },
                },
            },
        },
        base: {
            assetKey: "pets-cat-baby",
            assetUrl: "pets/cat/baby/spine/baby.png",
        },
    },
} 