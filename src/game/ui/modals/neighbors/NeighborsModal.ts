import { SizerBaseConstructorParams } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { NeighborsBackground } from "./NeighborsBackground"
import { NeighborsTabs } from "./NeighborsTabs"
import { getScreenCenterX, getScreenCenterY, getScreenTopY } from "../../utils"


export class NeighborsModal extends BaseSizer {
    private neighborsBackground: NeighborsBackground
    private neighborsTabs: NeighborsTabs

    constructor({ scene, x, y, height, width, config }: SizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.neighborsBackground = new NeighborsBackground({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        }).setScale(1.8)
        this.scene.add.existing(this.neighborsBackground)
        this.add(this.neighborsBackground)

        this.neighborsTabs = new NeighborsTabs({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenTopY(this.scene) + 100,
        })
        this.scene.add.existing(this.neighborsTabs)
        this.add(this.neighborsTabs)
    }
}