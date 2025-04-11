import { CropId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType, Metadata } from "./types"

export interface AssetCropData extends Metadata {
    phaser: {
        map: {
            stages: Record<number, AssetMapData>
        };
    };
    base: {
        stages: Record<number, AssetData>
    };
}

export const assetCropMap: Record<CropId, AssetCropData> = {
    [CropId.Turnip]: {
        name: "Turnip",
        description: "A hardy root vegetable with a crisp texture and slightly peppery flavor.",
        phaser: {
            map: {
                stages: {
                    0: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-turnip-1",
                            assetUrl: "crops/turnip/1.png",
                            extraOffsets: {
                                x: 0,
                                y: -85,
                            },
                        },
                    },
                    1: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-turnip-2",
                            assetUrl: "crops/turnip/2.png",
                            extraOffsets: {
                                x: 0,
                                y: -90,
                            },
                            version: 2,
                        },
                    },
                    2: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-turnip-3",
                            assetUrl: "crops/turnip/3.png",
                            extraOffsets: {
                                x: -10,
                                y: -90,
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
                    assetUrl: "crops/turnip/1.png",
                },
                1: {
                    assetKey: "crop-turnip-2",
                    assetUrl: "crops/turnip/2.png",
                },
                2: {
                    assetKey: "crop-turnip-3",
                    assetUrl: "crops/turnip/3.png",
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
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-carrot-1",
                            assetUrl: "crops/carrot/1.png",
                            extraOffsets: {
                                x: 0,
                                y: -85,
                            },
                        },
                    },
                    1: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-carrot-2",
                            assetUrl: "crops/carrot/2.png",
                            extraOffsets: {
                                x: 0,
                                y: -90,
                            },
                        },
                    },
                    2: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-carrot-3",
                            assetUrl: "crops/carrot/3.png",
                            extraOffsets: {
                                x: 15,
                                y: -90,
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
                    assetUrl: "crops/carrot/1.png",
                },
                1: {
                    assetKey: "crop-carrot-2",
                    assetUrl: "crops/carrot/2.png",
                },
                2: {
                    assetKey: "crop-carrot-3",
                    assetUrl: "crops/carrot/3.png",
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
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-potato-1",
                            assetUrl: "crops/potato/1.png",
                            extraOffsets: {
                                x: 0,
                                y: -85,
                            },
                        },
                    },
                    1: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-potato-2",
                            assetUrl: "crops/potato/2.png",
                            extraOffsets: {
                                x: -10,
                                y: -90,
                            },
                        },
                    },
                    2: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-potato-3",
                            assetUrl: "crops/potato/3.png",
                            extraOffsets: {
                                x: 0,
                                y: -50,
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
                    assetUrl: "crops/potato/1.png",
                },
                1: {
                    assetKey: "crop-potato-2",
                    assetUrl: "crops/potato/2.png",
                },
                2: {
                    assetKey: "crop-potato-3",
                    assetUrl: "crops/potato/3.png",
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
                    1: {
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
                    2: {
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
                    1: {
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
                    2: {
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
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-cucumber-1",
                            assetUrl: "crops/cucumber/1.png",
                            extraOffsets: {
                                x: 0,
                                y: -85,
                            },
                        },
                    },
                    1: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-cucumber-2",
                            assetUrl: "crops/cucumber/2.png",
                            extraOffsets: {
                                x: 0,
                                y: -60,
                            },
                        },
                    },
                    2: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-cucumber-3",
                            assetUrl: "crops/cucumber/3.png",
                            extraOffsets: {
                                x: 20,
                                y: -60,
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
                    assetUrl: "crops/cucumber/1.png",
                },
                1: {
                    assetKey: "crop-cucumber-2",
                    assetUrl: "crops/cucumber/2.png",
                },
                2: {
                    assetKey: "crop-cucumber-3",
                    assetUrl: "crops/cucumber/3.png",
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
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-bell-pepper-1",
                            assetUrl: "crops/bell-pepper/1.png",
                            extraOffsets: {
                                x: 0,
                                y: -85,
                            },
                        },
                    },
                    1: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-bell-pepper-2",
                            assetUrl: "crops/bell-pepper/2.png",
                            extraOffsets: {
                                x: 10,
                                y: -15,
                            },
                        },
                    },
                    2: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-bell-pepper-3",
                            assetUrl: "crops/bell-pepper/3.png",
                            extraOffsets: {
                                x: 20,
                                y: -20,
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
                    assetUrl: "crops/bell-pepper/1.png",
                },
                1: {
                    assetKey: "crop-bell-pepper-2",
                    assetUrl: "crops/bell-pepper/2.png",
                },
                2: {
                    assetKey: "crop-bell-pepper-3",
                    assetUrl: "crops/bell-pepper/3.png",
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
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-strawberry-1",
                            assetUrl: "crops/strawberry/1.png",
                            extraOffsets: {
                                x: 0,
                                y: -85,
                            },
                        },
                    },
                    1: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-strawberry-2",
                            assetUrl: "crops/strawberry/2.png",
                            extraOffsets: {
                                x: 0,
                                y: -30,
                            },
                        },
                    },
                    2: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "crop-strawberry-3",
                            assetUrl: "crops/strawberry/3.png",
                            extraOffsets: {
                                x: 0,
                                y: -30,
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
                    assetUrl: "crops/strawberry/1.png",
                },
                1: {
                    assetKey: "crop-strawberry-2",
                    assetUrl: "crops/strawberry/2.png",
                },
                2: {
                    assetKey: "crop-strawberry-3",
                    assetUrl: "crops/strawberry/3.png",
                },
            },
        },
    },
}
