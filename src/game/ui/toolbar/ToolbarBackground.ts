import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../assets"
import { ContainerLiteBaseConstructorParams } from "../../types"
import { onGameObjectPress } from "../utils"

export class ToolbarBackground extends ContainerLite {
    private background: Phaser.GameObjects.Image
    private prevButton: Sizer
    private nextButton: Sizer

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)
        // create the background
        this.background = this.scene.add
            .image(0, 0, BaseAssetKey.ToolbarBackground)
            .setOrigin(0.5, 1)
        this.addLocal(this.background)

        // create the prev button
        this.prevButton = this.createPrevButton()
        this.addLocal(this.prevButton)
        // create the next button
        this.nextButton = this.createNextButton()
        this.addLocal(this.nextButton)
    }

    private createPrevButton() {
        const background = this.scene.add.image(
            0,
            0,
            BaseAssetKey.ToolbarPrevAvatar
        )
        const icon = this.scene.add.image(0, 0, BaseAssetKey.ToolbarPrevIcon)
        //
        const prevButton = this.scene.rexUI.add
            .sizer({
                originX: 0,
                x: -(this.background.width / 2 - 80),
                y: -(this.background.height / 2 + 20),
                width: background.width,
                height: background.height,
            })
            .addBackground(background)
            .addSpace()
            .add(icon, {
                align: "center",
            })
            .addSpace()
            .layout()
        prevButton
            .setInteractive()
            .on("pointerdown", () => {
                onGameObjectPress({
                    gameObject: prevButton,
                    onPress: () => {
                        console.log("prev button clicked")
                    },
                    scene: this.scene,
                })
            })
            .layout()
        return prevButton
    }

    private createNextButton() {
        const background = this.scene.add.image(
            0,
            0,
            BaseAssetKey.ToolbarNextAvatar
        )
        const icon = this.scene.add.image(0, 0, BaseAssetKey.ToolbarNextIcon)
        //
        const nextButton = this.scene.rexUI.add
            .sizer({
                originX: 1,
                x: this.background.width / 2 - 80,
                y: -(this.background.height / 2 + 20),
                width: background.width,
                height: background.height,
            })
            .addBackground(background)
            .addSpace()
            .add(icon, {
                align: "center",
            })
            .addSpace()
            .layout()
        nextButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: nextButton,
                onPress: () => {
                    console.log("next button clicked")
                },
                scene: this.scene,
            })
        })
        return nextButton
    }
}
