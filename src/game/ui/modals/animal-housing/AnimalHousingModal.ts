import { BaseSizerBaseConstructorParams } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    getScreenBottomY,
    getScreenCenterX
} from "../../utils"
import { AnimalHousingContent } from "./AnimalHousingContent"

export class AnimalHousingModal extends BaseSizer {
    private animalHousingContent: AnimalHousingContent

    constructor({
        scene,
        x,
        y,
        height,
        width,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.animalHousingContent = new AnimalHousingContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenBottomY(this.scene),
        })
        this.scene.add.existing(this.animalHousingContent)
        this.add(this.animalHousingContent)
    }
}
