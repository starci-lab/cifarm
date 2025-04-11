import { FruitId } from "@/modules/entities"
import { AssetData, AssetMapData, AssetMapType } from "./types"

export interface AssetFruitData {
    name: string;
    phaser: {
        map: {
            stages: Record<number, AssetMapData>
        };
    };
    base: {
        stages: Record<number, AssetData>
    };
}

// Fruit asset data map with the GID and asset URL for each fruit using FruitId as the key
export const assetFruitMap: Record<FruitId, AssetFruitData> = {
    [FruitId.Banana]: {
        name: "Banana",
        phaser: {
            map: {
                stages: {
                    0: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-banana-1",
                            assetUrl: "fruits/banana/1.png",
                            extraOffsets: {
                                x: -20,
                                y: -173,
                            },
                        },
                    },
                    1: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-banana-2",
                            assetUrl: "fruits/banana/2.png",
                            extraOffsets: {
                                x: -10,
                                y: -175,
                            },
                        },
                    },
                    2: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-banana-3",
                            assetUrl: "fruits/banana/3.png",
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                    3: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-banana-4",
                            assetUrl: "fruits/banana/4.png",
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                    4: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-banana-5",
                            assetUrl: "fruits/banana/5.png",
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "fruit-banana-1",
                    assetUrl: "fruits/banana/1.png",
                },
                1: {
                    assetKey: "fruit-banana-2",
                    assetUrl: "fruits/banana/2.png",
                },
                2: {
                    assetKey: "fruit-banana-3",
                    assetUrl: "fruits/banana/3.png",
                },
                3: {
                    assetKey: "fruit-banana-4",
                    assetUrl: "fruits/banana/4.png",
                },
                4: {
                    assetKey: "fruit-banana-5",
                    assetUrl: "fruits/banana/5.png",
                },
            },
        },
    },
    [FruitId.Apple]: {
        name: "Apple",
        phaser: {
            map: {
                stages: {
                    0: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-apple-1",
                            assetUrl: "fruits/apple/1.png",
                            extraOffsets: {
                                x: 0,
                                y: -190,
                            },
                        },
                    },
                    1: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-apple-2",
                            assetUrl: "fruits/apple/2.png",
                            extraOffsets: {
                                x: 10,
                                y: -170,
                            },
                        },
                    },
                    2: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-apple-3",
                            assetUrl: "fruits/apple/3.png",
                            extraOffsets: {
                                x: 0,
                                y: -150,
                            },
                        },
                    },
                    3: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-apple-4",
                            assetUrl: "fruits/apple/4.png",
                            extraOffsets: {
                                x: 0,
                                y: -150,
                            },
                        },
                    },
                    4: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-apple-5",
                            assetUrl: "fruits/apple/5.png",
                            extraOffsets: {
                                x: 0,
                                y: -150,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "fruit-apple-1",
                    assetUrl: "fruits/apple/1.png",
                },
                1: {
                    assetKey: "fruit-apple-2",
                    assetUrl: "fruits/apple/2.png",
                },
                2: {
                    assetKey: "fruit-apple-3",
                    assetUrl: "fruits/apple/3.png",
                },
                3: {
                    assetKey: "fruit-apple-4",
                    assetUrl: "fruits/apple/4.png",
                },
                4: {
                    assetKey: "fruit-apple-5",
                    assetUrl: "fruits/apple/5.png",
                },
            },
        },
    },
    [FruitId.DragonFruit]: {
        name: "Dragon Fruit",
        phaser: {
            map: {
                stages: {
                    0: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-dragon-fruit-1",
                            assetUrl: "fruits/dragon-fruit/1.png",
                            packageId: 1,
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                    1: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-dragon-fruit-2",
                            assetUrl: "fruits/dragon-fruit/2.png",
                            packageId: 1,
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                    2: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-dragon-fruit-3",
                            assetUrl: "fruits/dragon-fruit/3.png",
                            packageId: 1,
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                    3: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-dragon-fruit-4",
                            assetUrl: "fruits/dragon-fruit/4.png",
                            packageId: 1,
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                    4: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-dragon-fruit-5",
                            assetUrl: "fruits/dragon-fruit/5.png",
                            packageId: 1,
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "fruit-dragon-fruit-1",
                    assetUrl: "fruits/dragon-fruit/1.png",
                },
                1: {
                    assetKey: "fruit-dragon-fruit-2",
                    assetUrl: "fruits/dragon-fruit/2.png",
                },
                2: {
                    assetKey: "fruit-dragon-fruit-3",
                    assetUrl: "fruits/dragon-fruit/3.png",
                },
                3: {
                    assetKey: "fruit-dragon-fruit-4",
                    assetUrl: "fruits/dragon-fruit/4.png",
                },
                4: {
                    assetKey: "fruit-dragon-fruit-5",
                    assetUrl: "fruits/dragon-fruit/5.png",
                },
            },
        },
    },
    [FruitId.Jackfruit]: {
        name: "Jackfruit",
        phaser: {
            map: {
                stages: {
                    0: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-jackfruit-1",
                            assetUrl: "fruits/jackfruit/1.png",
                            packageId: 1,
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                    1: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-jackfruit-2",
                            assetUrl: "fruits/jackfruit/2.png",
                            packageId: 1,
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                    2: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-jackfruit-3",
                            assetUrl: "fruits/jackfruit/3.png",
                            packageId: 1,
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                    3: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-jackfruit-4",
                            assetUrl: "fruits/jackfruit/4.png",
                            packageId: 1,
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                    4: {
                        type: AssetMapType.Texture,
                        texture: {
                            assetKey: "fruit-jackfruit-5",
                            assetUrl: "fruits/jackfruit/5.png",
                            packageId: 1,
                            extraOffsets: {
                                x: 0,
                                y: -170,
                            },
                        },
                    },
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "fruit-jackfruit-1",
                    assetUrl: "fruits/jackfruit/1.png",
                },
                1: {
                    assetKey: "fruit-jackfruit-2",
                    assetUrl: "fruits/jackfruit/2.png",
                },
                2: {
                    assetKey: "fruit-jackfruit-3",
                    assetUrl: "fruits/jackfruit/3.png",
                },
                3: {
                    assetKey: "fruit-jackfruit-4",
                    assetUrl: "fruits/jackfruit/4.png",
                },
                4: {
                    assetKey: "fruit-jackfruit-5",
                    assetUrl: "fruits/jackfruit/5.png",
                },
            },
        },
    },
}

// // Function to load all fruit assets
// export const loadFruitAssets = async (scene: Scene) => {
//     // Load all fruit assets
//     const promises: Promise<void>[] = []
//     for (const fruitData of Object.values(fruitAssetMap)) {
//     // Load shop asset if exists
//         if (fruitData.shop) {
//             promises.push(loadTexture(scene, fruitData.shop.textureConfig))
//         }

//         // Load all stage assets
//         for (const stageData of Object.values(fruitData.map)) {
//             switch (stageData.mainVisualType) {
//             case MainVisualType.Spine: {
//                 if (!stageData.spineConfig) {
//                     throw new Error("Spine config is undefined")
//                 }
//                 promises.push(loadSpine(scene, stageData.spineConfig))
//                 break
//             }
//             default: {
//                 if (!stageData.textureConfig) {
//                     throw new Error("Texture config is undefined")
//                 }
//                 promises.push(loadTexture(scene, stageData.textureConfig))
//                 break
//             }
//             }
//         }
//     }
//     await Promise.all(promises)
// }
