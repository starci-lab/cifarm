import { SizerBaseConstructorParams } from "../../../types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { SelectSeedContent } from "./SelectSeedContent"
import { SelectSeedBackground } from "./SelectSeedBackground"
import { calculateUiDepth, UILayer } from "@/game/layers"

export const CONTENT_DEPTH = calculateUiDepth({
    layer: UILayer.Modal,
    additionalDepth: 10,
    layerDepth: 1,
})

export const HIGHLIGH_DEPTH = calculateUiDepth({
    layer: UILayer.Tutorial,
    layerDepth: 1,
})

export class SelectSeedModal extends BaseSizer {
    private selectSeedContent: SelectSeedContent
    private selectSeedBackground: SelectSeedBackground
    constructor({
        scene,
        x,
        y,
        width,
        height,
        config,
    }: SizerBaseConstructorParams) {
        super(scene, x, y, width, height, config)
        // load the seed inventories
        this.selectSeedContent = new SelectSeedContent({
            scene: this.scene,
        }).setDepth(CONTENT_DEPTH)
        this.scene.add.existing(this.selectSeedContent)
        this.add(this.selectSeedContent)

        this.selectSeedBackground = new SelectSeedBackground({
            scene: this.scene,
        })
        this.scene.add.existing(this.selectSeedBackground)
        this.add(this.selectSeedBackground)
    }
}