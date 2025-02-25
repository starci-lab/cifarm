import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { ClaimContent } from "./ClaimContent"
import { BaseSizerBaseConstructorParams } from "../../../types"

export class ClaimModal extends BaseSizer {
    private claimContent: ClaimContent

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.claimContent = new ClaimContent({
            scene: this.scene,
            width,
            height
        })
        this.scene.add.existing(this.claimContent)
        this.addLocal(this.claimContent)
    }
}
