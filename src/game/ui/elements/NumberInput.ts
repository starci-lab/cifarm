import { BaseAssetKey } from "@/game/assets"
import { ConstructorParams, SizerBaseConstructorParams } from "../../types"
import { Label, Sizer, TextEdit } from "phaser3-rex-plugins/templates/ui/ui-components"
import { NinePatch3x3 } from "./NinePatch3x3"
import { TextColor } from "./Text"
import { onGameObjectPress } from "../utils"
import { BBCodeText } from "./BBCodeText"
import { UpdateValueParams, SetBoundsParams } from "./types"

export interface NumberInputOptions {
    // show left, right arrows
    showLeftArrow?: boolean
    showRightArrow?: boolean
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
    // show as paginator
    asPagination?: boolean
}
export class NumberInput extends Sizer {
    private leftArrow: Label | undefined
    private rightArrow: Label | undefined
    private inputText: Label  
    private bbCodeText: BBCodeText  
    public min: number
    public max: number

    constructor({ baseParams: { scene, config}, options}: ConstructorParams<SizerBaseConstructorParams, NumberInputOptions>) {
        super(scene, {
            space: {
                item: 20,
            },
            ...config,
        })

        if (!options) {
            throw new Error("NumberInput requires options")
        }
        const { showLeftArrow, showRightArrow, defaultValue = 1, onChange, fontSize = 48, min = 0, max = Infinity, textColor = TextColor.White, width = 200, asPagination = false } = options
        this.min = min
        this.max = max

        const sourceImage = scene.textures.get(BaseAssetKey.UICommonInput).getSourceImage()
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

        this.bbCodeText = new BBCodeText({
            baseParams: {
                scene: this.scene,
                text: defaultValue.toString(),
                style: {
                    align: "center",
                }
            },
            options: {
                fontSize,
                textColor,
                width,
            }
        })
        this.scene.add.existing(this.bbCodeText)

        if (showLeftArrow) {
        // left arrow icon
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
                        const value = this.bbCodeText.text
                        const afterValue = this.getValue(parseInt(value) - 1)
                        this.updateValue({ intValue: afterValue, onChange })
                    },
                    scene: this.scene,
                    disableInteraction: false,
                })
            })
            this.add(this.leftArrow)
        }
        
       
        this.inputText = scene.rexUI.add.label({
            background: inputBackground,
            width,
            height: sourceImage.height,
            text: this.bbCodeText,
            space: { top: 5, bottom: 5, left: 5, right: 5 },
            align: "center",
            originY: 0,
        })
        if (!asPagination) {
            this.inputText.setInteractive().on("pointerdown",() =>{
                const config: TextEdit.IConfigOpen = {
                    type: "number",
                    onTextChanged: (_, text) => {
                        const intValue = this.getValue(parseInt(text))
                        this.updateValue({ intValue, onChange })
                    },
                    onClose: () => {
                        this.inputText.layout()
                    },
                }
                scene.rexUI.edit(this.bbCodeText, config)
            })
        } 
        this.add(this.inputText)

        if (showRightArrow) {
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
                        const value = this.bbCodeText.text
                        const afterValue = this.getValue(parseInt(value) + 1)
                        this.updateValue({ intValue: afterValue, onChange })
                    },
                    scene: this.scene,
                    disableInteraction: false,
                })
            })

            this.add(this.rightArrow)
        }

        this.layout()
    }

    public setValue(value: number) {
        this.bbCodeText.setText(value)
        this.controlArrowVisibility(value)
    }

    private controlArrowVisibility(intValue: number = parseInt(this.bbCodeText.text)) {
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
        this.bbCodeText.setText(intValue)
        this.controlArrowVisibility(intValue)
        this.inputText.layout()
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

