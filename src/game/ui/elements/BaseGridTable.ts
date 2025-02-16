import { Scene } from "phaser"
import { BaseAssetKey } from "../../assets"
import { BadgeLabelBaseConstructorParams, ConstructorParams, GridTableBaseConstructorParams, ImageBaseConstructorParams } from "../../types"
import { BadgeLabel, GridTable } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText } from "./BaseText"

const INVENTORY_GRID_TABLE_HEIGHT = 650
const CELL_SPACING = 20
const LEFT_MARGIN = 20
const STORAGE_CELL_SCALE = 0.8
const STORAGE_COLUMN_COUNT = 4

export interface BaseGridTableOptions<TItem> {
    createCellContainerCallback: (cell: GridTable.CellType, cellContainer: Phaser.GameObjects.GameObject | null) => Phaser.GameObjects.GameObject,
    // additional methods for the 
    items: Array<TItem>
}

export interface CellInfo {
    cellWidth: number,
    cellHeight: number,
    scale: number,
}

export const getCellInfo = (scene: Scene): CellInfo => {
    const frameSourceImage = scene.textures
        .get(BaseAssetKey.UIModalCommonFrame)
        .getSourceImage()
    return {
        cellWidth: frameSourceImage.width * STORAGE_CELL_SCALE + CELL_SPACING,
        cellHeight: frameSourceImage.height * STORAGE_CELL_SCALE + CELL_SPACING,
        scale: STORAGE_CELL_SCALE,
    }
}

export class BaseGridTableFrame extends Phaser.GameObjects.Image {
    constructor({ scene, x, y }: ImageBaseConstructorParams) {
        super(scene, x, y, BaseAssetKey.UIModalCommonFrame)
    }
}

export class BaseGridTable<TItem> extends GridTable {
    constructor({ baseParams: { scene, config}, options }: ConstructorParams<GridTableBaseConstructorParams, BaseGridTableOptions<TItem>>) {
        if (!options) {
            throw new Error("BaseGridTable requires options")
        }

        const { cellHeight, cellWidth } = getCellInfo(scene)
    
        const gridWidth = cellWidth * STORAGE_COLUMN_COUNT + LEFT_MARGIN
                
        const { createCellContainerCallback, items } = options
        super(scene, {
            width: gridWidth,
            height: INVENTORY_GRID_TABLE_HEIGHT,
            table: {
                columns: STORAGE_COLUMN_COUNT, // Fixed 3 columns
                cellHeight: cellWidth, // Adjusted height per row
                cellWidth: cellHeight, // Adjusted width per column
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
    }
}

export interface BaseBadgeLabelOptions {
    assetKey: string
    //quantity of the item
    quantity?: number
    // show the badge
    showBadge?: boolean
    scale?: number
}
export class BaseGridTableCell extends BadgeLabel {
    constructor({ baseParams: { scene, config }, options}: ConstructorParams<BadgeLabelBaseConstructorParams, BaseBadgeLabelOptions>) {
        if (!options) {
            throw new Error("BaseGridTableCell requires options")
        }
        const { cellWidth, cellHeight } = getCellInfo(scene)
        const { assetKey, quantity = 1, scale = 1.2, showBadge = false } = options

        // create the icon
        const iconContainer = scene.rexUI.add.container(0, 0)
        const icon = scene.add.image(0, 0, assetKey)
        icon.setDisplaySize(icon.width * scale, icon.height * scale)
        iconContainer.add(icon)

        let text: BaseText | undefined
        if (showBadge) {
            text = new BaseText({
                baseParams: {
                    scene,
                    text: quantity.toString(),
                    x: 0,
                    y: 0,
                    style: {
                        padding: {
                            right: 10,
                            bottom: 10,
                        },
                    },
                },
                options: {
                    enableStroke: true,
                },
            })
            scene.add.existing(text)
        }

        super(scene, {
            center: iconContainer,
            width: cellWidth,
            height: cellHeight,
            rightBottom: text,
            ...config,
        })
    }
}