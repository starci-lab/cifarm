import { BaseAssetKey } from "@/game/assets"
import { ConstructorParams, SizerBaseConstructorParams } from "../../types"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { NinePatch3x3 } from "./NinePatch3x3"
import { BaseText, TextColor } from "./BaseText"
import { onGameObjectPress } from "../utils"

export interface PaginationOptions {
    // value
    defaultValue: number
    // onChange
    onChange: (value: number) => void
    // font size
    fontSize?: number
    textColor?: TextColor
    width?: number
    min?: number
    max?: number
}
export class PaginationInput extends Sizer {
    private leftArrow: Label | undefined
    private rightArrow: Label | undefined 
    private text: BaseText  
    private min: number
    private max: number

    constructor({ baseParams: { scene, config}, options}: ConstructorParams<SizerBaseConstructorParams, PaginationOptions>) {
        super(scene, {
            space: {
                item: 20,
            },
            ...config,
        })

        if (!options) {
            throw new Error("NumberInput requires options")
        }
        const { defaultValue = 1, onChange, fontSize = 48, min = 0, max = Infinity, textColor = TextColor.White } = options
        this.min = min
        this.max = max

        const inputBackground = new NinePatch3x3({
            baseParams: {
                scene,
            },
            options: {
                assetKey: BaseAssetKey.UICommonInput,
                leftWidth: 30,
                rightWidth: 30,
            }
        })
        scene.add.existing(inputBackground)

        this.text = new BaseText({
            baseParams: {
                scene: this.scene,
                text: defaultValue.toString(),
                x: 0,
                y: 0,
            },
            options: {
                fontSize,
                textColor,
            }
        })
        this.scene.add.existing(this.text)

        const leftAvatar = this.scene.add.image(0, 0, BaseAssetKey.UICommonPrevAvatar)
        const leftArrowIcon = this.scene.add.image(0, 0, BaseAssetKey.UICommonPrevIcon)
        this.leftArrow = this.scene.rexUI.add.label({
            background: leftAvatar,
            width: leftAvatar.width,
            height: leftAvatar.height,
            icon: leftArrowIcon,
            align: "center",
        }).setInteractive().on("pointerdown", () => {
            if (!this.leftArrow) {
                throw new Error("leftArrow is undefined")
            }
            onGameObjectPress({
                gameObject: this.leftArrow,
                onPress: () => {
                    const value = this.text.text
                    const afterValue = this.getValue(parseInt(value) - 1)
                    this.updateValue({ intValue: afterValue, onChange })
                },
                scene: this.scene,
                disableInteraction: false,
            })
        })
        this.add(this.leftArrow)
        
       
        // right arrow icon
        const rightAvatar = this.scene.add.image(0, 0, BaseAssetKey.UICommonNextAvatar)
        const rightArrowIcon = this.scene.add.image(0, 0, BaseAssetKey.UICommonNextIcon)
        this.rightArrow = this.scene.rexUI.add.label({
            background: rightAvatar,
            width: rightAvatar.width,
            height: rightAvatar.height,
            icon: rightArrowIcon,
            align: "center",
        }).setInteractive().on("pointerdown", () => {
            if (!this.rightArrow) {
                throw new Error("rightArrow is undefined")
            }
            onGameObjectPress({
                gameObject: this.rightArrow,
                onPress: () => {
                    const value = this.text.text
                    const afterValue = this.getValue(parseInt(value) + 1)
                    this.updateValue({ intValue: afterValue, onChange })
                },
                scene: this.scene,
                disableInteraction: false,
            })
        })

        this.add(this.rightArrow)
        this.layout()
    }

    private controlArrowVisibility(intValue: number = parseInt(this.text.text)) {
        if (this.leftArrow) {
            if (intValue <= this.min) {
                this.leftArrow.hide()
            } else {
                this.leftArrow.show()
            }
        }
        if (this.rightArrow) {
            if (intValue >= this.max) {
                this.rightArrow.hide()
            } else {
                this.rightArrow.show()
            }
        }
    }

    private updateValue({ intValue, onChange }: UpdateValueParams) {
        onChange(intValue)
        this.text.setText(intValue.toString())
        this.controlArrowVisibility(intValue)
    }

    private getValue(intValue: number) {
        if (isNaN(intValue)) {
            intValue = this.min
        }
        if (intValue <= this.min) {
            return this.min
        } else if (intValue >= this.max) {
            return this.max
        } else {
            return intValue
        }
    }

    public setBounds({ min, max }: SetBoundsParams) {
        if (typeof min !== "undefined") this.min = min 
        if (typeof max !== "undefined") this.max = max
        this.controlArrowVisibility()
    }
}

export interface SetBoundsParams {
    min?: number
    max?: number
}

export interface UpdateValueParams {
    intValue: number
    onChange: (value: number) => void
}