import { SizerBaseConstructorParams } from "../../../types"
import { ScreenUISizer } from "../../UISizer"
import { InventoryBackground } from "./InventoryBackground"
import { InventoryContent } from "./InventoryContent"
import { InventoryHeader } from "./InventoryHeader"
import { InventoryTabs } from "./InventoryTabs"

export class InventoryModal extends ScreenUISizer {
    private inventoryBackground: InventoryBackground
    private inventoryHeader: InventoryHeader
    private inventoryTabs: InventoryTabs
    private inventoryContent: InventoryContent

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        const { width, height } = this.scene.game.scale
        // create the inventory background
        this.inventoryBackground = new InventoryBackground({
            scene: this.scene,
            x: this.x,
            y: this.screenBottomY,
        })
        this.scene.add.existing(this.inventoryBackground)
        this.add(this.inventoryBackground)

        // create the header
        this.inventoryHeader = new InventoryHeader({
            scene: this.scene,
            x: this.x,
            y: this.y - 400,
        })
        this.scene.add.existing(this.inventoryHeader)
        this.add(this.inventoryHeader)

        // // add inventory tabs
        this.inventoryTabs = new InventoryTabs({
            scene: this.scene,
            x: this.screenLeftX + 220,
            y: this.y - 210,
        })
        this.scene.add.existing(this.inventoryTabs)
        this.add(this.inventoryTabs)

        // create the inventory content
        this.inventoryContent = new InventoryContent({
            scene: this.scene,
            x: this.centerX - 20,
            y: this.centerY + 350,
        }).setDepth(1)
        this.scene.add.existing(this.inventoryContent)
        this.add(this.inventoryContent)
    }
}
