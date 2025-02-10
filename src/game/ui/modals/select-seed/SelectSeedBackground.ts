import { BaseAssetKey } from "@/game/assets"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { getScreenCenterX, getScreenCenterY } from "../../utils"

export class SelectSeedBackground extends ContainerLite {
    private background: Phaser.GameObjects.Image

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)
        //full size backdrop
        this.background = this.scene.add
            .image(
                getScreenCenterX(this.scene),
                getScreenCenterY(this.scene),
                BaseAssetKey.ModalCommonBackground
            )
        this.add(this.background)
    }
}