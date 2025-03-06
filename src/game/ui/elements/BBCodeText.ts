import {
    BBCodeTextBaseConstructorParams,
    ConstructorParams,
} from "../../types"
import RexBBCodeText from "phaser3-rex-plugins/plugins/bbcodetext"
import { StrokeColor, TextColor } from "./Text"
import { FONT_DINOSAUR } from "../../constants"

// Text options
export interface BBCodeTextOptions {
  // text color
  textColor?: TextColor;
  // font size
  fontSize?: number;
  // stroke color, ignored if enableStroke is false
  strokeColor?: StrokeColor;
  // stroke thickness, ignored if enableStroke is false
  strokeThickness?: number;
  // enable stroke if needed
  enableStroke?: boolean;
  // enable word wrap
  enableWordWrap?: boolean;
  // width of the bbcode text
  width: number;
}

export class BBCodeText extends RexBBCodeText {
    constructor({
        baseParams: { scene, style, text, x, y },
        options,
    }: ConstructorParams<BBCodeTextBaseConstructorParams, BBCodeTextOptions>) {
        if (!options) {
            throw new Error("BBCodeText requires options")
        }
        const {
            fontSize = 48,
            textColor = TextColor.White,
            enableStroke,
            strokeColor = StrokeColor.Black,
            strokeThickness = 3,
            enableWordWrap,
            width
        } = options
        const stroke = enableStroke ? strokeColor : undefined
        const message = enableStroke ? `[stroke]${text}[/stroke]` : text
        const _strokeThickness = enableStroke ? strokeThickness : undefined
        const wordWrap = enableWordWrap ? { width } : undefined
        super(scene, x, y, message, {
            fontSize: `${fontSize ?? 32}px`,
            color: textColor,
            align: "left",
            valign: "center",
            halign: "center",
            fontFamily: FONT_DINOSAUR,
            ...(_strokeThickness !== undefined && { strokeThickness: _strokeThickness }),  // Include stroke only if it's not undefined
            ...(stroke !== undefined && { stroke }),  // Include strokeThickness if it's not undefined
            ...(wordWrap !== undefined && { wordWrap }),  // Include wordWrap if it's not undefined
            fixedWidth: width,
            ...style,
        })
    }
}
