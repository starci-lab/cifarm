import { SizerBaseConstructorParams } from "../../../types"
import { UISizer } from "../../UISizer"
import { InventoryBackground } from "./InventoryBackground"

export class InventoryModal extends UISizer {
    private inventoryBackground: InventoryBackground

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        const { width, height } = this.scene.game.scale
        // create the inventory background
        this.inventoryBackground = new InventoryBackground({
            scene: this.scene,
            x: this.x,
            y: height,
        })
        this.scene.add.existing(this.inventoryBackground)
        this.add(this.inventoryBackground)
        // // add the layouts
        // const { width } = this.scene.game.scale

        // this.wall = scene.add
        //     .image(0, 0, BaseAssetKey.ModalInventoryWall)
        //     .setScale(1.1)
        // this.add(this.wall)

        // // draw title
        // this.titleRibbon = scene.add
        //     .image(0, -480, BaseAssetKey.ModalInventoryTopRibbon)
        // this.add(this.titleRibbon)
        
        // this.titleText = new BaseText({
        //     baseParams: {
        //         scene: this.scene,
        //         x: 0,
        //         y: -500,
        //         text: "Shop",
        //     },
        //     options: {
        //         enableStroke: true,
        //         fontSize: 64,
        //     }
        // }).setOrigin(0.5, 0.5)
        // this.scene.add.existing(this.titleText)
        // this.add(this.titleText)

        // // draw btn close
        // const margin = 150
        // this.btnClose = scene.add
        //     .image(width / 2 - margin, - 400, BaseAssetKey.ModalInventoryBtnClose)
        //     .setOrigin(1, 0)
        //     .setDepth(1)
        //     .setInteractive()

        // this.btnClose.on("pointerdown", () => {
        //     this.scene.events.emit(EventName.ModalClosed)
        // })

        // this.add(this.btnClose)

        // // add inventory tabs
        // this.inventoryTabs = new InventoryTabs({
        //     scene: this.scene,
        //     x: 200,
        //     y: 0,
        // }).setPosition(-width / 2 + 130, -260)
        // this.add(this.inventoryTabs)
    }
}
