import { Buttons, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { FONT_DINOSAUR, STROKE_COLOR_1 } from "../../constants"
import { ConstructorParams, HorizontalButtonBaseConstructorParams } from "../../types"

export interface CreateButtonParams {
    iconKey: string;
    text: string;
    onClick?: () => void;
}

// options for horizontal buttons
export interface HorizontalButtonsOptions {
    orientation: Sizer.OrientationTypes;
    space: {
        item: number;
    };
}

export abstract class HorizontalButtons extends Buttons {
    protected ICON_RADIUS = 64
    protected ICON_TEXT_SPACING = -32
    protected TEXT_SIZE = "24px"
    protected TEXT_SIZE_IN_PIXELS = 24
    protected TEXT_FAMILY = FONT_DINOSAUR

    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<HorizontalButtonBaseConstructorParams, HorizontalButtonsOptions>) {
        const { orientation, space } = options

        super(scene, {
            orientation: orientation || "y",
            space: {
                item: space.item || 10,
            },
            ...config,
        })
    }

    // method to create a button
    public createButton({ iconKey, onClick, text }: CreateButtonParams) {
    // compute width and height
        const width = 2 * this.ICON_RADIUS
        const height = 2 * this.ICON_RADIUS

        // create a container to hold the button
        const container = this.scene.add.container(0, 0)
        // create image and text
        const image = this.scene.add
            .image(0, 0, iconKey)
            .setDisplaySize(width, height)
        const textObj = this.scene.add
            .text(0, this.ICON_RADIUS + this.ICON_TEXT_SPACING, text, {
                fontSize: this.TEXT_SIZE,
                fontFamily: this.TEXT_FAMILY,
            })
            .setOrigin(0.5, 0)
            .setStyle({
                stroke: STROKE_COLOR_1,
                strokeThickness: 3,
            })
            .setWordWrapWidth(width, false)
            .setAlign("center")
        container.add([image, textObj])
        // create the button
        const label = this.scene.rexUI.add.label({
            width,
            height,
            background: this.scene.add.existing(container),
        })

        if (onClick) {
            label.on("pointerdown", () => {
                const scaleTime = 500
                // set interactive to false
                if (label.input) {
                    label.input.enabled = false
                }
                // scale the button
                label.scaleYoyo(scaleTime, 1.1)
                // wait for the scale to finish
                this.scene.time.delayedCall(scaleTime, () => {
                    // set interactive to true
                    if (label.input) {
                        label.input.enabled = true
                    }
                })
                onClick()
            })
        }

        // return the button
        return label
    }
}


