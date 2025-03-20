import {
    Label,
    TextEdit,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { TextColor } from "./Text"
import { ConstructorParams, LabelBaseConstructorParams } from "@/game/types"
import { BaseAssetKey } from "@/game/assets"
import { NinePatch3x3 } from "./NinePatch3x3"
import { BBCodeText } from "./BBCodeText"

export enum InputIcon {
  MagnifyingGlass = "magnifying-glass",
}

export interface InputOptions {
  // onChange
  onChange: (value: string) => void;
  // font size
  fontSize?: number;
  textColor?: TextColor;
  width?: number;
  icon?: InputIcon;
}

export class Input extends Label {
    private bbText: BBCodeText
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<LabelBaseConstructorParams, InputOptions>) {
        if (!options) {
            throw new Error("Input requires options")
        }
        const map = {
            [InputIcon.MagnifyingGlass]: BaseAssetKey.UICommonIconMagnifyingGlass,
        }

        const {
            onChange,
            fontSize = 48,
            textColor = TextColor.White,
            width = 200,
            icon,
        } = options
        const sourceImage = scene.textures
            .get(BaseAssetKey.UICommonInput)
            .getSourceImage()
        const inputBackground = new NinePatch3x3({
            baseParams: {
                scene,
            },
            options: {
                assetKey: BaseAssetKey.UICommonInput,
                leftWidth: 30,
                rightWidth: 30,
            },
        })
        scene.add.existing(inputBackground)

        const iconKey = icon ? map[icon] : undefined
        const iconImage = iconKey ? scene.add.image(0, 0, iconKey) : undefined
        const text = new BBCodeText({
            baseParams: {
                scene,
                text: "",
                style: {
                    fixedWidth: width,
                },
            },
            options: {
                fontSize,
                textColor,
                width,
            },
        })
        scene.add.existing(text)
        super(scene, {
            background: inputBackground,
            width,
            height: sourceImage.height,
            text,
            rtl: true,
            space: { top: 5, bottom: 5, left: 20, right: 20, iconLeft: 10 },
            align: "center",
            icon: iconImage,
            originY: 0,
            ...config,
        })
        this.bbText = text

        this.setInteractive().on("pointerdown", () => {
            console.log("pointerdown")
            const config: TextEdit.IConfigOpen = {
                type: "text",
                onTextChanged: (_, text) => {
                    this.updateValue({ text, onChange })
                },
                onClose: () => {
                    this.layout()
                },
            }
            this.scene.rexUI.edit(this.bbText, config)
        })

        this.layout()
    }

    private updateValue({ text, onChange }: UpdateValueParams) {
        onChange(text)
        this.bbText.setText(text)
        this.layout()
    }
}

interface UpdateValueParams {
  text: string;
  onChange: (value: string) => void;
}
