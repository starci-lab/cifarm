import { ShopContent } from "./ShopContent"
import { ShopHeader } from "./ShopHeader"
import { ShopTabs } from "./ShopTabs"
import { BaseSizerBaseConstructorParams } from "@/game/types"
import {
    getScreenBottomY,
    getScreenCenterX,
} from "../../utils"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { IModal } from "@/game/interfaces"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { Background, ModalBackground } from "../../elements"
import { EventBus, EventName, ModalName } from "@/game/event-bus"

// shop modal extends BaseSizer
export class ShopModal extends BaseSizer implements IModal {
    private container: ContainerLite
    private shopContent: ShopContent
    private shopHeader: ShopHeader
    private shopTabs: ShopTabs
    private shopBackground: ContainerLite

    constructor({
        scene,
        x,
        y,
        height,
        width,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.container = this.scene.rexUI.add.container(getScreenCenterX(this.scene), getScreenBottomY(this.scene) - 100)
        this.add(this.container)
        this.shopBackground = new ModalBackground({
            baseParams: {
                scene: this.scene,
            },
            options: {
                background: Background.Large,
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.Shop
                    })
                },
                title: "Shop",
            }
        })
        this.scene.add.existing(this.shopBackground)
        this.container.addLocal(this.shopBackground)

        //create the shop content
        this.shopContent = new ShopContent({
            scene: this.scene,
            y: -100,
        })
        this.scene.add.existing(this.shopContent)
        this.container.addLocal(this.shopContent)
    }
}
