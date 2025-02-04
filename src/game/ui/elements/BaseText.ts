import { FONT_DINOSAUR } from "@/game/constants"
import { ConstructorParams, TextBaseConstructorParams } from "../../types"

// Text options
export interface TextOptions {
  // boolean to indicate if stroke should be enabled
  enableStroke?: boolean;
  // text color
  textColor?: TextColor;
  // font size
  fontSize?: number;
  // stroke color, ignored if enableStroke is false
  strokeColor?: StrokeColor;
  // stroke thickness, ignored if enableStroke is false
  strokeThickness?: number;
  // enable word wrap
  enableWordWrap?: boolean;
  // word wrap width, ignored if enableWordWrap is false
  wordWrapWidth?: number;
}

export enum TextColor {
  Brown = "#553320",
  White = "#ffffff",
}

export enum StrokeColor {
  Black = "#000000",
  RoyalPurple = "#4B2AB4",
  Chestnut = "#59312C"
}

export class BaseText extends Phaser.GameObjects.Text {
    constructor({
        baseParams: { scene, x, y, text, style },
        options,
    }: ConstructorParams<TextBaseConstructorParams, TextOptions>) {
        super(scene, x, y, text, {
            fontSize: `${options.fontSize ?? 32}px`,
            color: options.textColor ?? TextColor.White,
            align: "center",
            fontFamily: FONT_DINOSAUR,
            ...style,
        })

        // enable stroke if needed
        if (options.enableStroke) {
            this.setStroke(
                options.strokeColor ?? StrokeColor.Black,
                options.strokeThickness ?? 3
            )
        }

        // enable word wrap if needed
        if (options.enableWordWrap) {
            this.setWordWrapWidth(options.wordWrapWidth ?? 200, false)
        }

        // set origin for the text
        this.setOrigin(0.5, 0.5)
    }
}
