import { PetId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, Metadata } from "./types"

export interface AssetPetData extends Metadata {
    phaser: {
        map: AssetMapData
    };
    base: AssetData
}

const PREFIX = "pets"

export const assetPetMap: Record<PetId, AssetPetData> = {
    [PetId.Dog]: {
        name: "Dog",
        description: "Loyal companion with playful nature.",
        phaser: {
            map: {
                type: AssetMapType.Spine,
                spine: {
                    atlas: {
                        assetKey: "pets-dog-baby-atlas",
                        assetUrl: `${PREFIX}/dog/baby/spine/baby.atlas`,
                        textureUrl: `${PREFIX}/dog/baby/spine/baby.png`,
                    },
                    json: {
                        assetKey: "pets-dog-baby-json",
                        assetUrl: `${PREFIX}/dog/baby/spine/baby.json`,
                    },
                    extraOffsets: { x: 0, y: -80 },
                },
            },
        },
        base: {
            assetKey: "pets-dog-baby",
            assetUrl: `${PREFIX}/dog/baby/spine/baby.png`,
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
                        assetKey: "pets-cat-baby-atlas",
                        assetUrl: `${PREFIX}/cat/baby/spine/baby.atlas`,
                        textureUrl: `${PREFIX}/cat/baby/spine/baby.png`,
                    },
                    json: {
                        assetKey: "pets-cat-baby-json",
                        assetUrl: `${PREFIX}/cat/baby/spine/baby.json`,
                    },
                    extraOffsets: { x: 0, y: -80 },
                },
            },
        },
        base: {
            assetKey: "pets-cat-baby",
            assetUrl: `${PREFIX}/cat/baby/spine/baby.png`,
        },
    },
} 