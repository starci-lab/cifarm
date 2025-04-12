import { FlowerId } from "../entities"
import { AssetData, AssetMapData, AssetMapType, Metadata } from "./types"

export interface AssetFlowerData extends Metadata {
    phaser: {
        map: {
            stages: Record<number, AssetMapData>
        };
    };
    base: {
        stages: Record<number, AssetData>
    };
}

const PREFIX = "flowers"
export const assetFlowerMap: Record<FlowerId, AssetFlowerData> = {
    [FlowerId.Daisy]: {
        name: "Daisy",
        description: "A small, yellow flower with a white center.",
        phaser: {
            map: {
                stages: {
                    0: {
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
                    1: {
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
                    2: {
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
                    3: {
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
                    4: {
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

