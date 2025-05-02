import { AnimalId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, BubbleStateConfig } from "./types"

export enum AnimalAge {
    Baby = "baby",
    Adult = "adult",
}

export interface AnimalAssetMapData {
    mapData: AssetMapData;
    bubbleStateConfig?: BubbleStateConfig;
}

export interface AssetAnimalData {
    name: string;
    phaser: {
        map: {
            ages: Record<AnimalAge, AnimalAssetMapData>
        };
    };
    base: {
        ages: Record<AnimalAge, AssetData>
    };
}

export const assetAnimalMap: Record<AnimalId, AssetAnimalData> = {
    [AnimalId.Cow]: {
        name: "Cow",
        phaser: {
            map: {
                ages: {
                    [AnimalAge.Baby]: {
                        mapData: {
                            type: AssetMapType.Spine,
                            spine: {
                                atlas: {
                                    assetKey: "animals-cow-baby-atlas",
                                    assetUrl: "animals/cow/baby/spine/baby.atlas",
                                    textureUrl: "animals/cow/baby/spine/baby.png",
                                    version: 4,
                                },
                                json: {
                                    assetKey: "animals-cow-baby-json",
                                    assetUrl: "animals/cow/baby/spine/baby.json",
                                    version: 4,
                                },
                                extraOffsets: { x: 0, y: -80 },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -20,
                                y: -35,
                            },
                        },
                    },
                    [AnimalAge.Adult]: {
                        mapData: {
                            type: AssetMapType.Spine,
                            spine: {
                                atlas: {
                                    assetKey: "animals-cow-adult-atlas",
                                    assetUrl: "animals/cow/adult/spine/adult.atlas",
                                    textureUrl: "animals/cow/adult/spine/adult.png",
                                    version: 3,
                                },
                                json: {
                                    assetKey: "animals-cow-adult-json",
                                    assetUrl: "animals/cow/adult/spine/adult.json",
                                    version: 3,
                                },
                                extraOffsets: { x: 0, y: -80 },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: 0,
                                y: -80,
                            },
                        },
                    },
                },
            },
        },
        base: {
            ages: {
                [AnimalAge.Baby]: {
                    assetKey: "animals-cow-baby",
                    assetUrl: "animals/cow/baby/spine/baby.png",
                },
                [AnimalAge.Adult]: {
                    assetKey: "animals-cow-adult",
                    assetUrl: "animals/cow/adult/spine/adult.png",
                },
            },
        },
    },
    [AnimalId.Chicken]: {
        name: "Chicken",
        phaser: {
            map: {
                ages: {
                    [AnimalAge.Baby]: {
                        mapData: {
                            type: AssetMapType.Spine,
                            spine: {
                                atlas: {
                                    assetKey: "animals-chicken-baby-atlas",
                                    assetUrl: "animals/chicken/baby/spine/baby.atlas",
                                    textureUrl: "animals/chicken/baby/spine/baby.png",
                                    version: 3,
                                },
                                json: {
                                    assetKey: "animals-chicken-baby-json",
                                    assetUrl: "animals/chicken/baby/spine/baby.json",
                                    version: 3,
                                },
                                extraOffsets: { x: 0, y: -80 },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -40,
                                y: -25,
                            },
                        },
                    },
                    [AnimalAge.Adult]: {
                        mapData: {
                            type: AssetMapType.Spine,
                            spine: {
                                atlas: {
                                    assetKey: "animals-chicken-adult-atlas",
                                    assetUrl: "animals/chicken/adult/spine/adult.atlas",
                                    textureUrl: "animals/chicken/adult/spine/adult.png",
                                    version: 3,
                                },
                                json: {
                                    assetKey: "animals-chicken-adult-json",
                                    assetUrl: "animals/chicken/adult/spine/adult.json",
                                    version: 3,
                                },
                                extraOffsets: { x: 0, y: -80 },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -65,
                                y: -45,
                            },
                        },
                    },
                },
            },
        },
        base: {
            ages: {
                [AnimalAge.Baby]: {
                    assetKey: "animals-chicken-baby",
                    assetUrl: "animals/chicken/baby/spine/baby.png",
                },
                [AnimalAge.Adult]: {
                    assetKey: "animals-chicken-adult",
                    assetUrl: "animals/chicken/adult/spine/adult.png",
                },
            },
        },
    },
} 