import { BaseAssetKey } from "../../assets"
import {
    ConstructorParams,
    GridTableBaseConstructorParams,
    ImageBaseConstructorParams,
} from "../../types"
import { GridTable } from "phaser3-rex-plugins/templates/ui/ui-components"

const MARGIN = 15
const STORAGE_COLUMN_COUNT = 4

export interface BaseGridTableOptions<TItem> {
  createCellContainerCallback: (
    cell: GridTable.CellType,
    cellContainer: Phaser.GameObjects.GameObject | null
  ) => Phaser.GameObjects.GameObject;
  // additional methods for the
  items: Array<TItem>;
  columns?: number;
}

export class BaseGridTableFrame extends Phaser.GameObjects.Image {
    constructor({ scene, x, y }: ImageBaseConstructorParams) {
        super(scene, x, y, BaseAssetKey.UIModalCommonFrame)
    }
}

export interface CellSize {
    width: number
    height: number
}

export const getCellSize = (scene: Phaser.Scene): CellSize => {
    const sourceImage = scene.textures
        .get(BaseAssetKey.UIModalCommonFrame)
        .getSourceImage()
    return {
        width: sourceImage.width,
        height: sourceImage.height,
    }
}

export class BaseGridTable<TItem> extends GridTable {
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<
    GridTableBaseConstructorParams,
    BaseGridTableOptions<TItem>
  >) {
        if (!options) {
            throw new Error("BaseGridTable requires options")
        }

        const frameSourceImage = scene.textures
            .get(BaseAssetKey.UIModalCommonFrame)
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
                thumb: scene.add.image(0, 0, BaseAssetKey.UIModalCommonThumb),
            },
            mouseWheelScroller: { focus: false, speed: 2 },
            createCellContainerCallback,
            items,
            ...config,
        })
        console.log(this)
    }
}
