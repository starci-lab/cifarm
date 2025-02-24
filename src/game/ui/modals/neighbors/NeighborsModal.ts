import { BaseSizerBaseConstructorParams } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { getScreenBottomY, getScreenCenterX } from "../../utils"
import { NeighborsContent } from "./NeighborsContent"

export class NeighborsModal extends BaseSizer {
    private neighborsContent: NeighborsContent

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.neighborsContent = new NeighborsContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenBottomY(this.scene) - 100,
        })
        this.scene.add.existing(this.neighborsContent)
        this.add(this.neighborsContent)
    }
}