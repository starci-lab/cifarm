import { FlowerId } from "../entities"
import { AssetData, AssetMapData, AssetMapType, BubbleStateConfig, Metadata } from "./types"

export interface FlowerAssetMapData {
    mapData: AssetMapData,
    bubbleStateConfig?: BubbleStateConfig;
}

export interface AssetFlowerData extends Metadata {
    phaser: {
        map: {
            stages: Record<number, FlowerAssetMapData>
        };
    };
    base: {
        stages: Record<number, AssetData>
    };
}

const PREFIX = "/flowers"
export const assetFlowerMap: Record<FlowerId, AssetFlowerData> = {
    [FlowerId.Daisy]: {
        name: "Daisy",
        description: "A small, yellow flower with a white center.",
        phaser: {
            map: {
                stages: {
                    0: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "flower-daisy-1",
                                assetUrl: `${PREFIX}/daisy/1.png`,
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
                    1: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "flower-daisy-2",
                                assetUrl: `${PREFIX}/daisy/2.png`,
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
                                assetKey: "flower-daisy-3",
                                assetUrl: `${PREFIX}/daisy/3.png`,
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
                    3: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "flower-daisy-4",
                                assetUrl: `${PREFIX}/daisy/4.png`,
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
                    4: {
                        mapData: {
                            type: AssetMapType.Texture,
                            texture: {
                                assetKey: "flower-daisy-5",
                                assetUrl: `${PREFIX}/daisy/5.png`,
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
                },
            },
        },
        base: {
            stages: {
                0: {
                    assetKey: "flower-daisy-1",
                    assetUrl: `${PREFIX}/daisy/1.png`,
                },
                1: {
                    assetKey: "flower-daisy-2",
                    assetUrl: `${PREFIX}/daisy/2.png`,
                },
                2: {
                    assetKey: "flower-daisy-3",
                    assetUrl: `${PREFIX}/daisy/3.png`,
                },
                3: {
                    assetKey: "flower-daisy-4",
                    assetUrl: `${PREFIX}/daisy/4.png`,
                },
                4: {
                    assetKey: "flower-daisy-5",
                    assetUrl: `${PREFIX}/daisy/5.png`,
                },
            },
        },
    },
}   

