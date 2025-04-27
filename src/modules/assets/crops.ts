import { CropId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, Metadata, BubbleStateConfig } from "./types"


export interface CropAssetMapData {
    mapData: AssetMapData,
    bubbleStateConfig?: BubbleStateConfig;
}

export interface AssetCropData extends Metadata {
    phaser: {
        map: {
            stages: Record<number, CropAssetMapData>
        };
    };
    base: {
        stages: Record<number, AssetData>
    };
}

const PREFIX = "/crops"

export const assetCropMap: Record<CropId, AssetCropData> = {
    [CropId.Turnip]: {
        name: "Turnip",
        description: "A hardy root vegetable with a crisp texture and slightly peppery flavor.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-turnip-1",
                                assetUrl: `${PREFIX}/turnip/1.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -85,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -15,
                            },
                        },
                    },
                    1: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-turnip-2",
                                assetUrl: `${PREFIX}/turnip/2.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -90,
                                },
                                version: 2,
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -15,
                            },
                        },
                    },
                    2: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-turnip-3",
                                assetUrl: `${PREFIX}/turnip/3.png`,
                                extraOffsets: {
                                    x: -10,
                                    y: -90,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -15,
                            },
                        },
                    },
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-turnip-4",
                                assetUrl: `${PREFIX}/turnip/4.png`,
                                extraOffsets: {
                                    x: -10,
                                    y: -87,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -15,
                            },
                        },
                    },
                    4: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-turnip-5",
                                assetUrl: `${PREFIX}/turnip/5.png`,
                                extraOffsets: {
                                    x: -10,
                                    y: -85,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "crop-turnip-1",
                    assetUrl: `${PREFIX}/turnip/1.png`,
                },
                1: {
                    assetKey: "crop-turnip-2",
                    assetUrl: `${PREFIX}/turnip/2.png`,
                },
                2: {
                    assetKey: "crop-turnip-3",
                    assetUrl: `${PREFIX}/turnip/3.png`,
                },
                3: {
                    assetKey: "crop-turnip-4",
                    assetUrl: `${PREFIX}/turnip/4.png`,
                },
                4: {
                    assetKey: "crop-turnip-5",
                    assetUrl: `${PREFIX}/turnip/5.png`,
                },
            },
        },
    },
    [CropId.Carrot]: {
        name: "Carrot",
        description: "Sweet and crunchy root vegetable rich in beta-carotene.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-carrot-1",
                                assetUrl: `${PREFIX}/carrot/1.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -85,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    1: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-carrot-2",
                                assetUrl: `${PREFIX}/carrot/2.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -90,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    2: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-carrot-3",
                                assetUrl: `${PREFIX}/carrot/3.png`,
                                extraOffsets: {
                                    x: 15,
                                    y: -90,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-carrot-4",
                                assetUrl: `${PREFIX}/carrot/4.png`,
                                extraOffsets: {
                                    x: 15,
                                    y: -90,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    4: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-carrot-5",
                                assetUrl: `${PREFIX}/carrot/5.png`,
                                extraOffsets: {
                                    x: 15,
                                    y: -90,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "crop-carrot-1",
                    assetUrl: `${PREFIX}/carrot/1.png`,
                },
                1: {
                    assetKey: "crop-carrot-2",
                    assetUrl: `${PREFIX}/carrot/2.png`,
                },
                2: {
                    assetKey: "crop-carrot-3",
                    assetUrl: `${PREFIX}/carrot/3.png`,
                },
                3: {
                    assetKey: "crop-carrot-4",
                    assetUrl: `${PREFIX}/carrot/4.png`,
                },
                4: {
                    assetKey: "crop-carrot-5",
                    assetUrl: `${PREFIX}/carrot/5.png`,
                },
            },
        },
    },
    [CropId.Potato]: {
        name: "Potato",
        description: "Versatile tuber crop with starchy texture.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-potato-1",
                                assetUrl: `${PREFIX}/potato/1.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -85,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    1: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-potato-2",
                                assetUrl: `${PREFIX}/potato/2.png`,
                                extraOffsets: {
                                    x: -10,
                                    y: -90,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    2: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-potato-3",
                                assetUrl: `${PREFIX}/potato/3.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -50,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },  
                    },
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-potato-4",
                                assetUrl: `${PREFIX}/potato/4.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -50,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    4: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-potato-5",
                                assetUrl: `${PREFIX}/potato/5.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -50,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "crop-potato-1",
                    assetUrl: `${PREFIX}/potato/1.png`,
                },
                1: {
                    assetKey: "crop-potato-2",
                    assetUrl: `${PREFIX}/potato/2.png`,
                },
                2: {
                    assetKey: "crop-potato-3",
                    assetUrl: `${PREFIX}/potato/3.png`,
                },
                3: {
                    assetKey: "crop-potato-4",
                    assetUrl: `${PREFIX}/potato/4.png`,
                },
                4: {
                    assetKey: "crop-potato-5",
                    assetUrl: `${PREFIX}/potato/5.png`,
                },
            },
        },
    },
    [CropId.Pineapple]: {
        name: "Pineapple",
        description: "Tropical fruit with sweet, tangy flavor and spiky crown.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-pineapple-1",
                                assetUrl: "crops/pineapple/1.png",
                                extraOffsets: {
                                    x: 0,
                                    y: -85,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    1: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-pineapple-2",
                                assetUrl: "crops/pineapple/2.png",
                                extraOffsets: {
                                    x: 0,
                                    y: -70,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    2: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-pineapple-3",
                                assetUrl: "crops/pineapple/3.png",
                                extraOffsets: {
                                    x: -0,
                                    y: -45,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-pineapple-4",
                                assetUrl: "crops/pineapple/4.png",
                                extraOffsets: {
                                    x: -0,
                                    y: -45,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    4: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-pineapple-5",
                                assetUrl: "crops/pineapple/5.png",
                                extraOffsets: {
                                    x: -0,
                                    y: -45,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "crop-pineapple-1",
                    assetUrl: "crops/pineapple/1.png",
                },
                1: {
                    assetKey: "crop-pineapple-2",
                    assetUrl: "crops/pineapple/2.png",
                },
                2: {
                    assetKey: "crop-pineapple-3",
                    assetUrl: "crops/pineapple/3.png",
                },
                3: {
                    assetKey: "crop-pineapple-4",
                    assetUrl: "crops/pineapple/4.png",
                },
                4: {
                    assetKey: "crop-pineapple-5",
                    assetUrl: "crops/pineapple/5.png",
                },
            },
        },
    },
    [CropId.Watermelon]: {
        name: "Watermelon",
        description: "Large, juicy fruit with sweet red flesh.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-watermelon-1",
                                assetUrl: "crops/watermelon/1.png",
                                extraOffsets: {
                                    x: 0,
                                    y: -85,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    1: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-watermelon-1",
                                assetUrl: "crops/watermelon/2.png",
                                extraOffsets: {
                                    x: 5,
                                    y: -40,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    2: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-watermelon-2",
                                assetUrl: "crops/watermelon/3.png",
                                extraOffsets: {
                                    x: 5,
                                    y: -40,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-watermelon-3",
                                assetUrl: "crops/watermelon/4.png",
                                extraOffsets: {
                                    x: 5,
                                    y: -40,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    4: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-watermelon-4",
                                assetUrl: "crops/watermelon/5.png",
                                extraOffsets: {
                                    x: 5,
                                    y: -40,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "crop-watermelon-1",
                    assetUrl: "crops/watermelon/1.png",
                },
                1: {
                    assetKey: "crop-watermelon-1",
                    assetUrl: "crops/watermelon/2.png",
                },
                2: {
                    assetKey: "crop-watermelon-2",
                    assetUrl: "crops/watermelon/3.png",
                },
                3: {
                    assetKey: "crop-watermelon-3",
                    assetUrl: "crops/watermelon/4.png",
                },
                4: {
                    assetKey: "crop-watermelon-4",
                    assetUrl: "crops/watermelon/5.png",
                },
            },
        },
    },
    [CropId.Cucumber]: {
        name: "Cucumber",
        description: "Refreshing vegetable with crisp texture.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-cucumber-1",
                                assetUrl: `${PREFIX}/cucumber/1.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -85,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    1: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-cucumber-2",
                                assetUrl: `${PREFIX}/cucumber/2.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -60,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    2: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-cucumber-3",
                                assetUrl: `${PREFIX}/cucumber/3.png`,
                                extraOffsets: {
                                    x: 20,
                                    y: -60,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-cucumber-4",
                                assetUrl: `${PREFIX}/cucumber/4.png`,
                                extraOffsets: {
                                    x: 20,
                                    y: -60,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    4: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-cucumber-5",
                                assetUrl: `${PREFIX}/cucumber/5.png`,
                                extraOffsets: {
                                    x: 20,
                                    y: -60,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "crop-cucumber-1",
                    assetUrl: `${PREFIX}/cucumber/1.png`,
                },
                1: {
                    assetKey: "crop-cucumber-2",
                    assetUrl: `${PREFIX}/cucumber/2.png`,
                },
                2: {
                    assetKey: "crop-cucumber-3",
                    assetUrl: `${PREFIX}/cucumber/3.png`,
                },
                3: {
                    assetKey: "crop-cucumber-4",
                    assetUrl: `${PREFIX}/cucumber/4.png`,
                },
                4: {
                    assetKey: "crop-cucumber-5",
                    assetUrl: `${PREFIX}/cucumber/5.png`,
                },
            },
        },
    },
    [CropId.BellPepper]: {
        name: "Bell Pepper",
        description: "Colorful vegetable with sweet, mild flavor.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-bell-pepper-1",
                                assetUrl: `${PREFIX}/bell-pepper/1.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -85,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    1: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-bell-pepper-2",
                                assetUrl: `${PREFIX}/bell-pepper/2.png`,
                                extraOffsets: {
                                    x: 10,
                                    y: -15,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    2: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-bell-pepper-3",
                                assetUrl: `${PREFIX}/bell-pepper/3.png`,
                                extraOffsets: {
                                    x: 20,
                                    y: -20,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-bell-pepper-4",
                                assetUrl: `${PREFIX}/bell-pepper/4.png`,
                                extraOffsets: {
                                    x: 20,
                                    y: -20,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    4: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-bell-pepper-5",
                                assetUrl: `${PREFIX}/bell-pepper/5.png`,
                                extraOffsets: {
                                    x: 20,
                                    y: -20,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "crop-bell-pepper-1",
                    assetUrl: `${PREFIX}/bell-pepper/1.png`,
                },
                1: {
                    assetKey: "crop-bell-pepper-2",
                    assetUrl: `${PREFIX}/bell-pepper/2.png`,
                },
                2: {
                    assetKey: "crop-bell-pepper-3",
                    assetUrl: `${PREFIX}/bell-pepper/3.png`,
                },
                3: {
                    assetKey: "crop-bell-pepper-4",
                    assetUrl: `${PREFIX}/bell-pepper/4.png`,
                },
                4: {
                    assetKey: "crop-bell-pepper-5",
                    assetUrl: `${PREFIX}/bell-pepper/5.png`,
                },
            },
        },
    },
    [CropId.Strawberry]: {
        name: "Strawberry",
        description: "Sweet, red berry with juicy texture and small seeds.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-strawberry-1",
                                assetUrl: `${PREFIX}/strawberry/1.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -85,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    1: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-strawberry-2",
                                assetUrl: `${PREFIX}/strawberry/2.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -30,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    2: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-strawberry-3",
                                assetUrl: `${PREFIX}/strawberry/3.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -30,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-strawberry-4",
                                assetUrl: `${PREFIX}/strawberry/4.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -30,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                    4: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-strawberry-5",
                                assetUrl: `${PREFIX}/strawberry/5.png`,
                                extraOffsets: {
                                    x: 0,
                                    y: -30,
                                },
                            },
                        },
                        bubbleStateConfig: {
                            extraOffsets: {
                                x: -25,
                                y: -25,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "crop-strawberry-1",
                    assetUrl: `${PREFIX}/strawberry/1.png`,
                },
                1: {
                    assetKey: "crop-strawberry-2",
                    assetUrl: `${PREFIX}/strawberry/2.png`,
                },
                2: {
                    assetKey: "crop-strawberry-3",
                    assetUrl: `${PREFIX}/strawberry/3.png`,
                },
                3: {
                    assetKey: "crop-strawberry-4",
                    assetUrl: `${PREFIX}/strawberry/4.png`,
                },
                4: {
                    assetKey: "crop-strawberry-5",
                    assetUrl: `${PREFIX}/strawberry/5.png`,
                },
            },
        },
    },
}
