import { BaseSizerBaseConstructorParams } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { NeighborsContent } from "./NeighborsContent"
import { NeighborsTabs } from "./NeighborsTabs"
import { getScreenBottomY, getScreenCenterX, getScreenCenterY } from "../../utils"
import { NeighborsBackground } from "./NeighborsBackground"

export class NeighborsModal extends BaseSizer {
    private neighborsBackground: NeighborsBackground
    private neighborsTabs: NeighborsTabs
    private neighborsContent: NeighborsContent

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.neighborsBackground = new NeighborsBackground({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        })
        this.scene.add.existing(this.neighborsBackground)
        this.add(this.neighborsBackground)

        this.neighborsTabs = new NeighborsTabs({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenBottomY(this.scene) - 100,
        })
        this.scene.add.existing(this.neighborsTabs)
        this.add(this.neighborsTabs)

        this.neighborsContent = new NeighborsContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        })
        this.scene.add.existing(this.neighborsContent)
        this.add(this.neighborsContent)
    }
}