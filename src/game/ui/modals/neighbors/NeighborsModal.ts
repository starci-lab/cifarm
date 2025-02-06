import { SizerBaseConstructorParams } from "@/game/types"
import { ScreenUISizer } from "../../UISizer"
import { NeighborsBackground } from "./NeighborsBackground"


export class NeighborsModal extends ScreenUISizer {
    private neighborsBackground: NeighborsBackground

    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        this.neighborsBackground = new NeighborsBackground({
            scene: this.scene,
            x: this.screenCenterX,
            y: this.screenCenterY,
        }).setScale(1.8)
        this.scene.add.existing(this.neighborsBackground)
        this.add(this.neighborsBackground)
    }
}