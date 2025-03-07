import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { BaseSizerBaseConstructorParams } from "../../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { BaseAssetKey } from "@/game/assets"
import { Button } from "../../elements"

export class SpinContent extends BaseSizer {
    private spinner: ContainerLite
    private segments: ContainerLite
    private button: Button
    private pointerPosition: Phaser.Input.Pointer

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.spinner = this.scene.rexUI.add.container(0, -150)
        this.addLocal(this.spinner)

        const background = this.scene.add.image(0, 0, BaseAssetKey.UIModalSpinBackground)
        this.spinner.addLocal(background)

        const segmentsImage = this.scene.add.image(0, 0, BaseAssetKey.UIModalSpinSegments)
        this.segments = this.scene.rexUI.add.container(0, 0)
        this.segments.addLocal(segmentsImage)
        const light = this.scene.add.image(0, 0, BaseAssetKey.UIModalSpinLight)
        this.segments.addLocal(light)

        this.spinner.pinLocal(this.segments, {
            syncRotation: false,
        })

        const pointer = this.scene.add.image(0, 0, BaseAssetKey.UIModalSpinPointer).setPosition(0, -background.height / 2 + 50)
        this.spinner.addLocal(pointer)
        // get the pointer position, at the end of the image
        this.pointerPosition = pointer.getBottomCenter()
        const rect = this.scene.add.rectangle(this.pointerPosition.x, this.pointerPosition.y, 100, 100, 0xff0000)
        this.spinner.add(rect)
        const center = this.scene.add.image(0, 0, BaseAssetKey.UIModalSpinCenter)
        this.spinner.addLocal(center)
       
        // const pointer = this.scene.add.image(0, 0, BaseAssetKey.UIModalSpinPointer)
        // this.spinner.addLocal(pointer)
        
        this.button = new Button({
            baseParams: {
                scene,
                config: {
                    x: 0,
                    y: 450,
                },
            },
            options: {
                text: "Spin",
                onPress: () => {
                    // rotate the spinner
                    this.scene.tweens.add({
                        targets: this.segments,
                        angle: 360 * 10,
                        duration: 30000,
                        ease: "Cubic.easeOut",
                    }) 
                },
            },
        })
        this.scene.add.existing(this.button)
        this.addLocal(this.button)
    }
}
