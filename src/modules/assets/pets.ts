import { PetId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, BubbleStateConfig, Metadata } from "./types"

export interface PetAssetMapData {
    mapData: AssetMapData,
    bubbleStateConfig?: BubbleStateConfig;
    selectedConfig?: BubbleStateConfig;
}

export interface AssetPetData extends Metadata {
    phaser: {
        map: PetAssetMapData
    };
    base: AssetData
}

const PREFIX = "/pets"

export const assetPetMap: Record<PetId, AssetPetData> = {
    [PetId.Dog]: {
        name: "Dog",
        description: "Loyal companion with playful nature.",
        phaser: {
            map: {
                mapData: {
                    type: AssetMapType.Spine,
                    spine: {
                        atlas: {
                            assetKey: "pets-dog-atlas",
                            assetUrl: `${PREFIX}/dog/spine/dog.atlas`,
                            textureUrl: `${PREFIX}/dog/spine/dog.png`,
                            version: 2,
                        },
                        json: {
                            assetKey: "pets-dog-json",
                            assetUrl: `${PREFIX}/dog/spine/dog.json`,
                            version: 2,
                        },
                        extraOffsets: { x: 0, y: -80 },
                    },
                },
                selectedConfig: {
                    extraOffsets: { x: 0, y: -80 },
                },  
            },
        },
        base: {
            assetKey: "pets-dog",
            assetUrl: `${PREFIX}/dog/spine/dog.png`,
        },
    },
    [PetId.Cat]: {
        name: "Cat",
        description: "Independent feline with graceful movements.",
        phaser: {
            map: {
                mapData: {
                    type: AssetMapType.Spine,
                    spine: {
                        atlas: {
                            assetKey: "pets-cat-atlas",
                            assetUrl: `${PREFIX}/cat/spine/cat.atlas`,
                            textureUrl: `${PREFIX}/cat/spine/cat.png`,
                            version: 1,
                        },
                        json: {
                            assetKey: "pets-cat-json",
                            assetUrl: `${PREFIX}/cat/spine/cat.json`,
                            version: 1,
                        },
                        extraOffsets: { x: 0, y: -80 },
                    },
                },
                selectedConfig: {
                    extraOffsets: { x: 0, y: -80 },
                },
            },
        },
        base: {
            assetKey: "pets-cat",
            assetUrl: `${PREFIX}/cat/spine/cat.png`,
        },
    },
} 