import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams } from "../../../types"
import { getScreenBottomY, getScreenCenterX } from "../../utils"
import { InventoryToolbar } from "./InventoryToolbar"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { InventoryStorage } from "./InventoryStorage"

export class InventoryModal extends BaseSizer {
    //private inventoryContent: InventoryContent
    private inventoryToolbar: InventoryToolbar
    private inventoryStorage: InventoryStorage
    private container: ContainerLite
    constructor({ scene, x, y, width, height, config}: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height, config)

        this.container = this.scene.rexUI.add.container(getScreenCenterX(this.scene), getScreenBottomY(this.scene))
        this.add(this.container)
        // create the inventory toolbar
        this.inventoryToolbar = new InventoryToolbar(this.scene, 0, 0)
        this.scene.add.existing(this.inventoryToolbar)
        this.container.addLocal(this.inventoryToolbar)
        // create the inventory storage
        this.inventoryStorage = new InventoryStorage({
            scene: this.scene,
            y: -(this.inventoryToolbar.height - 20),
        })
        this.scene.add.existing(this.inventoryStorage)
        this.container.addLocal(this.inventoryStorage)
    }
}
