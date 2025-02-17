import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams } from "../../../types"
import { InventoryContent } from "./InventoryContent"
import { getScreenBottomY, getScreenCenterX } from "../../utils"
import { calculateUiDepth, UILayer } from "@/game/layers"

export const CONTENT_DEPTH = calculateUiDepth({
    layer: UILayer.Modal,
    additionalDepth: 1,
})

export const HIGHLIGH_DEPTH = calculateUiDepth({
    layer: UILayer.Tutorial,
    layerDepth: 1,
})

export class InventoryModal extends BaseSizer {
    private inventoryContent: InventoryContent

    constructor({ scene, x, y, width, height, config}: BaseSizerBaseConstructorParams) {
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
