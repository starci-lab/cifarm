import { ShopContent } from "./ShopContent"
import { ShopBackground } from "./ShopBackground"
import { ShopHeader } from "./ShopHeader"
import { ShopTabs } from "./ShopTabs"
import { SizerBaseConstructorParams } from "@/game/types"
import { ScreenUISizer } from "../../UISizer"

// shop modal extends BaseSizer
export class ShopModal extends ScreenUISizer {
    private shopContent: ShopContent
    private shopHeader: ShopHeader
    private shopTabs: ShopTabs
    private shopBackground: Phaser.GameObjects.Container | undefined

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        this.shopBackground = new ShopBackground({
            scene: this.scene,
            x: this.x,
            y: this.screenBottomY,
        })
        this.scene.add.existing(this.shopBackground)
        this.add(this.shopBackground)
                
        //create the shop content
        this.shopContent = new ShopContent({
            scene: this.scene,
            x: this.x,
            y: this.y - 300,
        })

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
