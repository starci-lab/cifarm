import { BaseAssetKey, baseAssetMap } from "../../assets"
import {
    ConstructorParams,
    GridTableBaseConstructorParams,
    ImageBaseConstructorParams,
} from "../../types"
import { GridTable as RexGridTable } from "phaser3-rex-plugins/templates/ui/ui-components"

const MARGIN = 15
const STORAGE_COLUMN_COUNT = 4

export interface GridTableOptions<TItem> {
  createCellContainerCallback: (
    cell: RexGridTable.CellType,
    cellContainer: Phaser.GameObjects.GameObject | null
  ) => Phaser.GameObjects.GameObject;
  // additional methods for the
  items: Array<TItem>;
  columns?: number;
}

export class GridTableFrame extends Phaser.GameObjects.Image {
    constructor({ scene, x, y }: ImageBaseConstructorParams) {
        super(scene, x, y, baseAssetMap[BaseAssetKey.UIModalCommonFrame].key)
    }
}

export interface CellSize {
    width: number
    height: number
}

export const getCellSize = (scene: Phaser.Scene): CellSize => {
    const sourceImage = scene.textures
        .get(baseAssetMap[BaseAssetKey.UIModalCommonFrame].key)
        .getSourceImage()
    return {
        width: sourceImage.width,
        height: sourceImage.height,
    }
}

export class GridTable<TItem> extends RexGridTable {
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<
    GridTableBaseConstructorParams,
    GridTableOptions<TItem>
  >) {
        if (!options) {
            throw new Error("GridTable requires options")
        }

        const frameSourceImage = scene.textures
            .get(baseAssetMap[BaseAssetKey.UIModalCommonFrame].key)
            .getSourceImage()
        const cellWidth = frameSourceImage.width + MARGIN
        const cellHeight = frameSourceImage.height + MARGIN

        const {
            createCellContainerCallback,
            items,
            columns = STORAGE_COLUMN_COUNT,
        } = options
        super(scene, {
            space: {
                left: 30,
                right: 40,
                top: 30,
                bottom: 30,
            },
            table: {
                columns, // Fixed 3 columns
                cellHeight, // Adjusted height per row
                cellWidth, // Adjusted width per column
                mask: { padding: 2 }, // Enable scrolling
                interactive: true, // Allow scrolling
            },
            slider: {
                thumb: scene.add.image(0, 0, baseAssetMap[BaseAssetKey.UIModalCommonThumb].key),
            },
            mouseWheelScroller: { focus: false, speed: 2 },
            createCellContainerCallback,
            items,
            ...config,
        })
    }
}
