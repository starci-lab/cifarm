import { AssetData, AssetMapData, AssetMapType, AssetTextureData, Metadata } from "./types"
import { DecorationId } from "@/types"
import { getAssetUrl } from "./utils"
import { Direction } from "./types"

const PREFIX = "/decorations"

export interface AssetDecorationData extends Metadata {
    base: AssetData
    phaser: {
        map: AssetMapData
        edges?: Record<Direction, AssetTextureData>
    }
}

export const assetDecorationMap: Record<DecorationId, AssetDecorationData> = {
    [DecorationId.WoodenFence]: {
        name: "Wooden Fence",
        description: "A fence made of wood.",
        base: {
            assetKey: "decoration-wooden-fence",
            assetUrl: getAssetUrl(`${PREFIX}/wooden-fence/wooden-fence.png`)
        },
        phaser: {
            map: {
                type: AssetMapType.Texture,
                texture: {
                    assetKey: "decoration-wooden-fence",
                    assetUrl: getAssetUrl(`${PREFIX}/wooden-fence/wooden-fence.png`),
                    version: 3,
                    extraOffsets: {
                        x: 0,
                        y: -60,
                    }
                }
            },
            edges: {
                [Direction.Horizontal]: {
                    assetKey: "decoration-wooden-fence-horizontal",
                    assetUrl: getAssetUrl(`${PREFIX}/wooden-fence/horizontal.png`),
                    extraOffsets: {
                        x: 0,
                        y: -60,
                    },
                    version: 2,
                },
                [Direction.Vertical]: {
                    assetKey: "decoration-wooden-fence-vertical",
                    assetUrl: getAssetUrl(`${PREFIX}/wooden-fence/vertical.png`),
                    extraOffsets: {
                        x: 0,
                        y: -60,
                    },
                    version: 2,
                }
            }
        },
    },
}
