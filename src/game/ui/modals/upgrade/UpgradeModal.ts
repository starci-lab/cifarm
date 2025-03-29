import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { UpgradeContent } from "./UpgradeContent"
import { BaseSizerBaseConstructorParams } from "../../../types"

export class UpgradeModal extends BaseSizer {
    private upgradeContent: UpgradeContent

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.upgradeContent = new UpgradeContent({
            scene: this.scene,
            width,
            height
        })
        this.scene.add.existing(this.upgradeContent)
        this.addLocal(this.upgradeContent)
    }
}
