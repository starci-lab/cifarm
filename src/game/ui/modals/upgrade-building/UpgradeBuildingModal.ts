import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { UpgradeBuildingContent } from "./UpgradeBuildingContent"
import { BaseSizerBaseConstructorParams } from "../../../types"

export class UpgradeBuildingModal extends BaseSizer {
    private upgradeBuildingContent: UpgradeBuildingContent

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.upgradeBuildingContent = new UpgradeBuildingContent({
            scene: this.scene,
            width,
            height
        })
        this.scene.add.existing(this.upgradeBuildingContent)
        this.addLocal(this.upgradeBuildingContent)
    }
}
