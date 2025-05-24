import { CropId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, Metadata, BubbleStateConfig } from "./types"
import { getAssetUrl } from "./utils"


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
                                assetUrl: getAssetUrl(`${PREFIX}/turnip/1.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/turnip/2.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -90,
                                },
                                version: 3,
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
                                assetUrl: getAssetUrl(`${PREFIX}/turnip/3.png`),
                                extraOffsets: {
                                    x: -10,
                                    y: -90,
                                },
                                version: 3,
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
                                assetUrl: getAssetUrl(`${PREFIX}/turnip/4.png`),
                                extraOffsets: {
                                    x: -10,
                                    y: -87,
                                },
                                version: 3,
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
                                assetUrl: getAssetUrl(`${PREFIX}/turnip/5.png`),
                                extraOffsets: {
                                    x: -10,
                                    y: -85,
                                },
                                version: 3,
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
                    assetUrl: getAssetUrl(`${PREFIX}/turnip/1.png`),
                },
                1: {
                    assetKey: "crop-turnip-2",
                    assetUrl: getAssetUrl(`${PREFIX}/turnip/2.png`),
                },
                2: {
                    assetKey: "crop-turnip-3",
                    assetUrl: getAssetUrl(`${PREFIX}/turnip/3.png`),
                },
                3: {
                    assetKey: "crop-turnip-4",
                    assetUrl: getAssetUrl(`${PREFIX}/turnip/4.png`),
                },
                4: {
                    assetKey: "crop-turnip-5",
                    assetUrl: getAssetUrl(`${PREFIX}/turnip/5.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/carrot/1.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/carrot/2.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/carrot/3.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/carrot/4.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/carrot/5.png`),
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
                    assetUrl: getAssetUrl(`${PREFIX}/carrot/1.png`),
                },
                1: {
                    assetKey: "crop-carrot-2",
                    assetUrl: getAssetUrl(`${PREFIX}/carrot/2.png`),
                },
                2: {
                    assetKey: "crop-carrot-3",
                    assetUrl: getAssetUrl(`${PREFIX}/carrot/3.png`),
                },
                3: {
                    assetKey: "crop-carrot-4",
                    assetUrl: getAssetUrl(`${PREFIX}/carrot/4.png`),
                },
                4: {
                    assetKey: "crop-carrot-5",
                    assetUrl: getAssetUrl(`${PREFIX}/carrot/5.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/potato/1.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/potato/2.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/potato/3.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/potato/4.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/potato/5.png`),
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
                    assetUrl: getAssetUrl(`${PREFIX}/potato/1.png`),
                },
                1: {
                    assetKey: "crop-potato-2",
                    assetUrl: getAssetUrl(`${PREFIX}/potato/2.png`),
                },
                2: {
                    assetKey: "crop-potato-3",
                    assetUrl: getAssetUrl(`${PREFIX}/potato/3.png`),
                },
                3: {
                    assetKey: "crop-potato-4",
                    assetUrl: getAssetUrl(`${PREFIX}/potato/4.png`),
                },
                4: {
                    assetKey: "crop-potato-5",
                    assetUrl: getAssetUrl(`${PREFIX}/potato/5.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/pineapple/1.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/pineapple/2.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/pineapple/3.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/pineapple/4.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/pineapple/5.png`),
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
                    assetUrl: getAssetUrl(`${PREFIX}/pineapple/1.png`),
                },
                1: {
                    assetKey: "crop-pineapple-2",
                    assetUrl: getAssetUrl(`${PREFIX}/pineapple/2.png`),
                },
                2: {
                    assetKey: "crop-pineapple-3",
                    assetUrl: getAssetUrl(`${PREFIX}/pineapple/3.png`),
                },
                3: {
                    assetKey: "crop-pineapple-4",
                    assetUrl: getAssetUrl(`${PREFIX}/pineapple/4.png`),
                },
                4: {
                    assetKey: "crop-pineapple-5",
                    assetUrl: getAssetUrl(`${PREFIX}/pineapple/5.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/watermelon/1.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -85,
                                },
                                version: 2,
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
                                assetKey: "crop-watermelon-2",
                                assetUrl: getAssetUrl(`${PREFIX}/watermelon/2.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -95,
                                },
                                version: 3,
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
                                assetKey: "crop-watermelon-3",
                                assetUrl: getAssetUrl(`${PREFIX}/watermelon/3.png`),
                                extraOffsets: {
                                    x: 5,
                                    y: -40,
                                },
                                version: 3,
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
                                assetKey: "crop-watermelon-4",
                                assetUrl: getAssetUrl(`${PREFIX}/watermelon/4.png`),
                                extraOffsets: {
                                    x: 5,
                                    y: -40,
                                },
                                version: 3,
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
                                assetKey: "crop-watermelon-5",
                                assetUrl: getAssetUrl(`${PREFIX}/watermelon/5.png`),
                                extraOffsets: {
                                    x: 5,
                                    y: -40,
                                },
                                version: 3,
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
                    assetUrl: getAssetUrl(`${PREFIX}/watermelon/1.png`),
                },
                1: {
                    assetKey: "crop-watermelon-2",
                    assetUrl: getAssetUrl(`${PREFIX}/watermelon/2.png`),
                },
                2: {
                    assetKey: "crop-watermelon-3",
                    assetUrl: getAssetUrl(`${PREFIX}/watermelon/3.png`),
                },
                3: {
                    assetKey: "crop-watermelon-4",
                    assetUrl: getAssetUrl(`${PREFIX}/watermelon/4.png`),
                },
                4: {
                    assetKey: "crop-watermelon-5",
                    assetUrl: getAssetUrl(`${PREFIX}/watermelon/5.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/cucumber/1.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/cucumber/2.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/cucumber/3.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/cucumber/4.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/cucumber/5.png`),
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
                    assetUrl: getAssetUrl(`${PREFIX}/cucumber/1.png`),
                },
                1: {
                    assetKey: "crop-cucumber-2",
                    assetUrl: getAssetUrl(`${PREFIX}/cucumber/2.png`),
                },
                2: {
                    assetKey: "crop-cucumber-3",
                    assetUrl: getAssetUrl(`${PREFIX}/cucumber/3.png`),
                },
                3: {
                    assetKey: "crop-cucumber-4",
                    assetUrl: getAssetUrl(`${PREFIX}/cucumber/4.png`),
                },
                4: {
                    assetKey: "crop-cucumber-5",
                    assetUrl: getAssetUrl(`${PREFIX}/cucumber/5.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/bell-pepper/1.png`),
                                version: 1,
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
                                assetUrl: getAssetUrl(`${PREFIX}/bell-pepper/2.png`),
                                version: 1,
                                extraOffsets: {
                                    x: -5,
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
                    2: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-bell-pepper-3",
                                assetUrl: getAssetUrl(`${PREFIX}/bell-pepper/3.png`),
                                version: 1,
                                extraOffsets: {
                                    x: -5,
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
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-bell-pepper-4",
                                assetUrl: getAssetUrl(`${PREFIX}/bell-pepper/4.png`),
                                version: 1,
                                extraOffsets: {
                                    x: -5,
                                    y: -80,
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
                                assetUrl: getAssetUrl(`${PREFIX}/bell-pepper/5.png`),
                                version: 1,
                                extraOffsets: {
                                    x: -5,
                                    y: -80,
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
                    assetUrl: getAssetUrl(`${PREFIX}/bell-pepper/1.png`),
                },
                1: {
                    assetKey: "crop-bell-pepper-2",
                    assetUrl: getAssetUrl(`${PREFIX}/bell-pepper/2.png`),
                },
                2: {
                    assetKey: "crop-bell-pepper-3",
                    assetUrl: getAssetUrl(`${PREFIX}/bell-pepper/3.png`),
                },
                3: {
                    assetKey: "crop-bell-pepper-4",
                    assetUrl: getAssetUrl(`${PREFIX}/bell-pepper/4.png`),
                },
                4: {
                    assetKey: "crop-bell-pepper-5",
                    assetUrl: getAssetUrl(`${PREFIX}/bell-pepper/5.png`),
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
                                assetUrl: getAssetUrl(`${PREFIX}/strawberry/1.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -85,
                                },
                                version: 2,
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
                                assetUrl: getAssetUrl(`${PREFIX}/strawberry/2.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -30,
                                },
                                version: 2,
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
                                assetUrl: getAssetUrl(`${PREFIX}/strawberry/3.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -30,
                                },
                                version: 2,
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
                                assetUrl: getAssetUrl(`${PREFIX}/strawberry/4.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -30,
                                },
                                version: 2,
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
                                assetUrl: getAssetUrl(`${PREFIX}/strawberry/5.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -30,
                                },
                                version: 2,
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
                    assetUrl: getAssetUrl(`${PREFIX}/strawberry/1.png`),
                },
                1: {
                    assetKey: "crop-strawberry-2",
                    assetUrl: getAssetUrl(`${PREFIX}/strawberry/2.png`),
                },
                2: {
                    assetKey: "crop-strawberry-3",
                    assetUrl: getAssetUrl(`${PREFIX}/strawberry/3.png`),
                },
                3: {
                    assetKey: "crop-strawberry-4",
                    assetUrl: getAssetUrl(`${PREFIX}/strawberry/4.png`),
                },
                4: {
                    assetKey: "crop-strawberry-5",
                    assetUrl: getAssetUrl(`${PREFIX}/strawberry/5.png`),
                },
            },
        },
    },
    [CropId.Cauliflower]: {
        name: "Cauliflower",
        description: "White, dense vegetable with a mild flavor.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-cauliflower-1",
                                assetUrl: getAssetUrl(`${PREFIX}/cauliflower/1.png`),
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
                                assetKey: "crop-cauliflower-2",
                                assetUrl: getAssetUrl(`${PREFIX}/cauliflower/2.png`),
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
                                assetKey: "crop-cauliflower-3",
                                assetUrl: getAssetUrl(`${PREFIX}/cauliflower/3.png`),
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
                                assetKey: "crop-cauliflower-4",
                                assetUrl: getAssetUrl(`${PREFIX}/cauliflower/4.png`),
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
                                assetKey: "crop-cauliflower-5",
                                assetUrl: getAssetUrl(`${PREFIX}/cauliflower/5.png`),
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
                    assetKey: "crop-cauliflower-1",
                    assetUrl: getAssetUrl(`${PREFIX}/cauliflower/1.png`),
                },
                1: {
                    assetKey: "crop-cauliflower-2",
                    assetUrl: getAssetUrl(`${PREFIX}/cauliflower/2.png`),
                },
                2: {
                    assetKey: "crop-cauliflower-3",
                    assetUrl: getAssetUrl(`${PREFIX}/cauliflower/3.png`),
                },
                3: {
                    assetKey: "crop-cauliflower-4",
                    assetUrl: getAssetUrl(`${PREFIX}/cauliflower/4.png`),
                },
                4: {
                    assetKey: "crop-cauliflower-5",
                    assetUrl: getAssetUrl(`${PREFIX}/cauliflower/5.png`),
                },
            },  
        },
    },
    [CropId.Tomato]: {
        name: "Tomato",
        description: "Red, juicy fruit with a tangy flavor.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-tomato-1",
                                assetUrl: getAssetUrl(`${PREFIX}/tomato/1.png`),
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
                                assetKey: "crop-tomato-2",
                                assetUrl: getAssetUrl(`${PREFIX}/tomato/2.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -95,
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
                                assetKey: "crop-tomato-3",
                                assetUrl: getAssetUrl(`${PREFIX}/tomato/3.png`),
                                extraOffsets: {
                                    x: -5,
                                    y: -95,
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
                                assetKey: "crop-tomato-4",
                                assetUrl: getAssetUrl(`${PREFIX}/tomato/4.png`),
                                extraOffsets: {
                                    x: -5,
                                    y: -95,
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
                                assetKey: "crop-tomato-5",
                                assetUrl: getAssetUrl(`${PREFIX}/tomato/5.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -75,
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
                    assetKey: "crop-tomato-1",
                    assetUrl: getAssetUrl(`${PREFIX}/tomato/1.png`),
                },
                1: {
                    assetKey: "crop-tomato-2",
                    assetUrl: getAssetUrl(`${PREFIX}/tomato/2.png`),
                },
                2: {
                    assetKey: "crop-tomato-3",
                    assetUrl: getAssetUrl(`${PREFIX}/tomato/3.png`),
                },
                3: {
                    assetKey: "crop-tomato-4",
                    assetUrl: getAssetUrl(`${PREFIX}/tomato/4.png`),
                },
                4: {
                    assetKey: "crop-tomato-5",
                    assetUrl: getAssetUrl(`${PREFIX}/tomato/5.png`),
                },
            },  
        },
    },
    [CropId.Pea]: {
        name: "Pea",
        description: "Green, round fruit with a sweet flavor.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-pea-1",
                                assetUrl: getAssetUrl(`${PREFIX}/pea/1.png`),
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
                                assetKey: "crop-pea-2",
                                assetUrl: getAssetUrl(`${PREFIX}/pea/2.png`),
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
                                assetKey: "crop-pea-3",
                                assetUrl: getAssetUrl(`${PREFIX}/pea/3.png`),
                                extraOffsets: {
                                    x: -15,
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
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-pea-4",
                                assetUrl: getAssetUrl(`${PREFIX}/pea/4.png`),
                                extraOffsets: {
                                    x: -15,
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
                    4: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-pea-5",
                                assetUrl: getAssetUrl(`${PREFIX}/pea/5.png`),
                                extraOffsets: {
                                    x: -10,
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
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "crop-pea-1",
                    assetUrl: getAssetUrl(`${PREFIX}/pea/1.png`),
                },
                1: {
                    assetKey: "crop-pea-2",
                    assetUrl: getAssetUrl(`${PREFIX}/pea/2.png`),
                },
                2: {
                    assetKey: "crop-pea-3",
                    assetUrl: getAssetUrl(`${PREFIX}/pea/3.png`),
                },
                3: {
                    assetKey: "crop-pea-4",
                    assetUrl: getAssetUrl(`${PREFIX}/pea/4.png`),
                },
                4: {
                    assetKey: "crop-pea-5",
                    assetUrl: getAssetUrl(`${PREFIX}/pea/5.png`),
                },
            },  
        },
    },
    [CropId.Eggplant]: {
        name: "Eggplant",
        description: "Purple, round fruit with a sweet flavor.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-eggplant-1",
                                assetUrl: getAssetUrl(`${PREFIX}/eggplant/1.png`),
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
                                assetKey: "crop-eggplant-2",
                                assetUrl: getAssetUrl(`${PREFIX}/eggplant/2.png`),
                                extraOffsets: {
                                    x: -15,
                                    y: -95,
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
                                assetKey: "crop-eggplant-3",
                                assetUrl: getAssetUrl(`${PREFIX}/eggplant/3.png`),
                                extraOffsets: {
                                    x: -15,
                                    y: -95,
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
                                assetKey: "crop-eggplant-4",
                                assetUrl: getAssetUrl(`${PREFIX}/eggplant/4.png`),
                                extraOffsets: {
                                    x: -15,
                                    y: -95,
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
                                assetKey: "crop-eggplant-5",
                                assetUrl: getAssetUrl(`${PREFIX}/eggplant/5.png`),
                                extraOffsets: {
                                    x: 0,
                                    y: -75,
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
                    assetKey: "crop-eggplant-1",
                    assetUrl: getAssetUrl(`${PREFIX}/eggplant/1.png`),
                },
                1: {
                    assetKey: "crop-eggplant-2",
                    assetUrl: getAssetUrl(`${PREFIX}/eggplant/2.png`),
                },
                2: {
                    assetKey: "crop-eggplant-3",
                    assetUrl: getAssetUrl(`${PREFIX}/eggplant/3.png`),
                },
                3: {
                    assetKey: "crop-eggplant-4",
                    assetUrl: getAssetUrl(`${PREFIX}/eggplant/4.png`),
                },
                4: {
                    assetKey: "crop-eggplant-5",
                    assetUrl: getAssetUrl(`${PREFIX}/eggplant/5.png`),
                },
            },  
        },
    },
    [CropId.Pumpkin]: {
        name: "Pumpkin",
        description: "Orange, round fruit with a sweet flavor.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "crop-pumpkin-1",
                                assetUrl: getAssetUrl(`${PREFIX}/pumpkin/1.png`),
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
                                assetKey: "crop-pumpkin-2",
                                assetUrl: getAssetUrl(`${PREFIX}/pumpkin/2.png`),
                                extraOffsets: {
                                    x: -10,
                                    y: -95,
                                },
                                version: 2,
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
                                assetKey: "crop-pumpkin-3",
                                assetUrl: getAssetUrl(`${PREFIX}/pumpkin/3.png`),
                                extraOffsets: {
                                    x: -20,
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
                                assetKey: "crop-pumpkin-4",
                                assetUrl: getAssetUrl(`${PREFIX}/pumpkin/4.png`),
                                extraOffsets: {
                                    x: -20,
                                    y: -50,
                                },
                                version: 5,
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
                                assetKey: "crop-pumpkin-5",
                                assetUrl: getAssetUrl(`${PREFIX}/pumpkin/5.png`),
                                extraOffsets: {
                                    x: -20,
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
                    assetKey: "crop-pumpkin-1",
                    assetUrl: getAssetUrl(`${PREFIX}/pumpkin/1.png`),
                },
                1: {
                    assetKey: "crop-pumpkin-2",
                    assetUrl: getAssetUrl(`${PREFIX}/pumpkin/2.png`),
                },
                2: {
                    assetKey: "crop-pumpkin-3",
                    assetUrl: getAssetUrl(`${PREFIX}/pumpkin/3.png`),
                },
                3: {
                    assetKey: "crop-pumpkin-4",
                    assetUrl: getAssetUrl(`${PREFIX}/pumpkin/4.png`),
                },
                4: {
                    assetKey: "crop-pumpkin-5",
                    assetUrl: getAssetUrl(`${PREFIX}/pumpkin/5.png`),
                },
            },  
        },
    },
}
