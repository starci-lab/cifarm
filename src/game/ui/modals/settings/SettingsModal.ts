import { BaseSizerBaseConstructorParams } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { getScreenCenterX, getScreenCenterY } from "../../utils"
import { SettingsContent } from "./SettingsContent"

export class SettingsModal extends BaseSizer {
    private settingsContent: SettingsContent 
    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        // create the daily content
        this.settingsContent = new SettingsContent({
            scene: this.scene,
            x: getScreenCenterX(this.scene),
            y: getScreenCenterY(this.scene),
        })
        this.scene.add.existing(this.settingsContent)
        this.add(this.settingsContent)
    }
}