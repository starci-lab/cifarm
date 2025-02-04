import { BaseAssetKey } from "@/game/assets"
import { GridTableBaseConstructorParams } from "@/game/types"
import GridTable from "phaser3-rex-plugins/plugins/gridtable"
import { ScrollablePanel } from "phaser3-rex-plugins/templates/ui/ui-components"

export class InventoryContent extends GridTable {
    private gridTable: GridTable
    // list of items
    constructor({ scene, x, y, height, width, config }: GridTableBaseConstructorParams) {
        super(scene, x, y, height, width, {
            // scrollMode: "vertical",
            // cellHeight: 200,
            // cellWidth: 200,
            // mask: {
            //     padding: 2
            // },
            // reuseCellContainer: true,
            ...config
        })

    }

    private createCell({
        iconAssetKey,
        onClick
    }: CreateCellParams) {
        // label
        const cellBackground = this.scene.add.image(0, 0, BaseAssetKey.ModalInventoryCell)
        // create the label
        const label = this.scene.rexUI.add.label({
            width: 200,
            height: 200,
            background: cellBackground,
            text: this.scene.add.image(0, 0, iconAssetKey),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            }
        })

        // add the on click event
        return label
    }
}

export interface CreateCellParams {
    // icon asset key
    iconAssetKey: string 
    // on click callback
    onClick: () => void
}