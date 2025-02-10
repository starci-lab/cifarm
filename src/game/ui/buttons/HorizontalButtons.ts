import { Buttons, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { ConstructorParams, ButtonsBaseConstructorParams } from "../../types"
import { BaseText } from "../elements"
import { onGameObjectPress } from "../utils"
import { EventBus, EventName } from "@/game/event-bus"

export interface CreateButtonParams {
    iconKey: string;
    text?: string;
    onPress?: () => void;
}

// options for horizontal buttons
export interface HorizontalButtonsOptions {
    orientation: Sizer.OrientationTypes;
    space: number
}

export abstract class HorizontalButtons extends Buttons {
    protected ICON_RADIUS = 64
    protected ICON_TEXT_SPACING = -12
    protected TEXT_SIZE_IN_PIXELS = 24

    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<ButtonsBaseConstructorParams, HorizontalButtonsOptions>) {
        const { orientation, space } = { ...options }

        super(scene, {
            orientation: orientation || "y",
            space: {
                item: space || 10,
            },
            ...config,
        })

        EventBus.on(EventName.HideButtons, () => {
            this.setVisible(false).setActive(false)
        })

        EventBus.on(EventName.ShowButtons, () => {
            this.setVisible(true).setActive(true)
        })
    }

    // method to create a button
    public createButton({ iconKey, onPress, text = "" }: CreateButtonParams) {
    // compute width and height
        const width = 2 * this.ICON_RADIUS
        const height = 2 * this.ICON_RADIUS

        // create a container to hold the button
        const container = this.scene.add.container(0, 0)
        // create image and text
        const image = this.scene.add
            .image(0, 0, iconKey)
            .setDisplaySize(width, height)
        const textObj = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: this.ICON_RADIUS + this.ICON_TEXT_SPACING,
                text,
            },
            options: {
                enableWordWrap: true,
                enableStroke: true,
                fontSize: this.TEXT_SIZE_IN_PIXELS,
                strokeThickness: 3,
                wordWrapWidth: width,
            },
        })
        this.scene.add.existing(textObj)
        container.add([image, textObj])
        // create the button
        const button = this.scene.rexUI.add.sizer({
            width,
            height,
        }).addBackground(container).layout()
        if (onPress) {
            button.on("pointerdown", () => {
                onGameObjectPress({
                    gameObject: button,
                    onPress,
                    scene: this.scene,
                })
            })
        }

        // return the button
        return button
    }
}


