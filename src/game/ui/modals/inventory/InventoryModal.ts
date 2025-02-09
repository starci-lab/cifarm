import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { SizerBaseConstructorParams } from "../../../types"
import { InventoryBackground } from "./InventoryBackground"
import { InventoryContent } from "./InventoryContent"
import { InventoryHeader } from "./InventoryHeader"
import { InventoryTabs } from "./InventoryTabs"
import { getScreenBottomY, getScreenCenterX, getScreenCenterY, getScreenLeftX } from "../../utils"

export class InventoryModal extends BaseSizer {
    private inventoryBackground: InventoryBackground
    private inventoryHeader: InventoryHeader
    private inventoryTabs: InventoryTabs
    private inventoryContent: InventoryContent

    constructor({ scene, x, y, width, height, config}: SizerBaseConstructorParams) {
        super(scene, x, y, width, height, config)

        // create the inventory background
        this.inventoryBackground = new InventoryBackground({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenBottomY(this.scene),
        })
        this.scene.add.existing(this.inventoryBackground)
        this.add(this.inventoryBackground)

        // // create the header
        this.inventoryHeader = new InventoryHeader({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene) - 400,
            width,
            height
        })
        this.scene.add.existing(this.inventoryHeader)
        this.add(this.inventoryHeader)

        // // // add inventory tabs
        this.inventoryTabs = new InventoryTabs({
            scene: this.scene,
            x: getScreenLeftX(this.scene) + 220,
            y: getScreenCenterY(this.scene) - 210,
        })
        this.scene.add.existing(this.inventoryTabs)
        this.add(this.inventoryTabs)

        // // create the inventory content
        this.inventoryContent = new InventoryContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene) - 20,
            y: getScreenCenterY(this.scene) + 350,
        }).setDepth(1)
        this.scene.add.existing(this.inventoryContent)
        this.add(this.inventoryContent)

        this.setDirty(false)
    }
}
