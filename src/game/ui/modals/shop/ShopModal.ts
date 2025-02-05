import {
    SizerBaseConstructorParams,
} from "../../../types/constructor-params/rexui"
import { ShopContent } from "./ShopContent"
import { ShopBackground } from "./ShopBackground"
import { UISizer } from "../../UISizer"
import { ShopHeader } from "./ShopHeader"
import { ShopTabs } from "./ShopTabs"

// shop modal extends UISizer to achieve full screen sizer and the position is the center of the screen
export class ShopModal extends UISizer {
    private shopContent: ShopContent
    private shopHeader: ShopHeader
    private shopTabs: ShopTabs
    private shopBackground: Phaser.GameObjects.Container | undefined

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        // create the shop background
        this.shopBackground = new ShopBackground({
            scene: this.scene,
            x: this.x,
            y: this.y,
        })
        this.scene.add.existing(this.shopBackground)
        this.add(this.shopBackground)
                
        //create the shop content
        this.shopContent = new ShopContent({
            scene: this.scene,
            x: this.x,
            y: this.y,
        }).setDepth(1)
        this.scene.add.existing(this.shopContent)
        this.add(this.shopContent)

        // create the shop tabs
        this.shopTabs = new ShopTabs({
            scene: this.scene,
            x: 30,
            y: this.y - 600,
        })
        this.scene.add.existing(this.shopTabs)
        this.add(this.shopTabs)
        // create the shop header
        this.shopHeader = new ShopHeader({
            scene: this.scene,
            x: this.x,
            y: this.y - 500,
        })
        this.scene.add.existing(this.shopHeader)
        this.add(this.shopHeader)
    }
}
