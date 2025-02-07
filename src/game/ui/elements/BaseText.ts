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
        const {
            fontSize = 32, 
            textColor = TextColor.White, 
            enableStroke,
            strokeColor = StrokeColor.Black,
            strokeThickness = 3,
            enableWordWrap,
            wordWrapWidth = 200
        } = { ...options }
        super(scene, x, y, text, {
            fontSize: `${fontSize ?? 32}px`,
            color: textColor,
            align: "center",
            fontFamily: FONT_DINOSAUR,
            ...style,
        })

        // enable stroke if needed
        if (enableStroke) {
            this.setStroke(
                strokeColor,
                strokeThickness
            )
        }

        // enable word wrap if needed
        if (enableWordWrap) {
            this.setWordWrapWidth(wordWrapWidth, false)
        }

        // set origin for the text
        this.setOrigin(0.5, 0.5)
    }
}
