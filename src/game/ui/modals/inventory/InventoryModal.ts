import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { SizerBaseConstructorParams } from "../../../types"
import { InventoryContent } from "./InventoryContent"
import { getScreenBottomY, getScreenCenterX } from "../../utils"

export class InventoryModal extends BaseSizer {
    private inventoryContent: InventoryContent

    constructor({ scene, x, y, width, height, config}: SizerBaseConstructorParams) {
        super(scene, x, y, width, height, config)

        // create the inventory storage
        this.inventoryContent = new InventoryContent({
            scene: this.scene,
            y: getScreenBottomY(this.scene),
            x: getScreenCenterX(this.scene),
        })
        this.scene.add.existing(this.inventoryContent)
        this.add(this.inventoryContent)

        this.setDirty(false)
    }
}
