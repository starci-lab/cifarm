import { BBCodeTextBaseConstructorParams, ConstructorParams } from "../../types"
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext"
import { TextColor } from "./BaseText"
import { FONT_DINOSAUR } from "../../constants"

// Text options
export interface BBCodeTextOptions {
  // text color
  textColor?: TextColor;
  // font size
  fontSize?: number;
}

export class BaseBBCodeText extends BBCodeText {
    constructor({ baseParams: {  scene, style, text, x, y}, options }: ConstructorParams<BBCodeTextBaseConstructorParams, BBCodeTextOptions>) {
        const { fontSize = 48, textColor = TextColor.White } = { ...options }
        super(scene, x, y, text, {
            fontSize: `${fontSize ?? 32}px`,
            color:  textColor,
            align: "center",
            valign: "center",
            halign: "center",
            fontFamily: FONT_DINOSAUR,
            ...style,
        })
    }
}