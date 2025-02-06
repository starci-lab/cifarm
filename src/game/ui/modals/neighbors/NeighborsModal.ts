import { SizerBaseConstructorParams } from "@/game/types"
import { ScreenUISizer } from "../../UISizer"
import { NeighborsBackground } from "./NeighborsBackground"
import { NeighborsTabs } from "./NeighborsTabs"


export class NeighborsModal extends ScreenUISizer {
    private neighborsBackground: NeighborsBackground
    private neighborsTabs: NeighborsTabs

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        this.neighborsBackground = new NeighborsBackground({
            scene: this.scene,
            x: this.screenCenterX,
            y: this.screenCenterY,
        }).setScale(1.8)
        this.scene.add.existing(this.neighborsBackground)
        this.add(this.neighborsBackground)

        this.neighborsTabs = new NeighborsTabs({
            scene: this.scene,
            x: this.screenCenterX,
            y: this.screenCenterY,
        })
        this.scene.add.existing(this.neighborsTabs)
        this.add(this.neighborsTabs)
    }
}