import { BaseSizerBaseConstructorParams } from "../../../types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import {
    Background,
    Slider,
    Text,
    getBackgroundContainerSize,
    ModalBackground,
    Size,
    SizeStyle,
    TextColor,
    Checkbox,
} from "../../elements"
import { SceneEventEmitter, SceneEventName, ModalName } from "../../../events"

export class SettingsContent extends BaseSizer {
    private background: ModalBackground
    private soundSlider: Slider
    private musicSlider: Slider
    private size: Size
    constructor({ scene, x, y, width, height }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)

        this.background = new ModalBackground({
            baseParams: {
                scene,
            },
            options: {
                align: "center",
                container: {
                    showWrapperContainer: false,
                    showContainer: true,
                },
                mainButton: {
                    text: "Save",
                    onPress: () => {
                        console.log("Save")
                    },
                },
                onXButtonPress: () => {
                    SceneEventEmitter.emit(SceneEventName.CloseModal, {
                        modalName: ModalName.Settings,
                    })
                },
                title: "Settings",
                background: Background.Medium,
            },
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        this.size = getBackgroundContainerSize({
            style: SizeStyle.Container,
            background: Background.Medium,
        })
        if (!this.size.width) {
            throw new Error("Size width is undefined")
        }

        const soundText = new Text({
            baseParams: {
                scene,
                text: "Sound",
                x: 0,
                y: 0,
            },
            options: {
                fontSize: 48,
                textColor: TextColor.Brown,
            },
        })
        this.scene.add.existing(soundText)
        this.soundSlider = new Slider({
            baseParams: {
                scene,
            },
            options: {
                valuechangeCallback: (value: number) => {
                    SceneEventEmitter.emit(SceneEventName.UpdateVolume, {
                        volume: value,
                    })
                },
            }
        })
        this.scene.add.existing(this.soundSlider)
        const soundSizer = this.scene.rexUI.add
            .sizer({
                orientation: "horizontal",
                space: {
                    item: 40,
                },
            })
            .add(soundText)
            .add(this.soundSlider)
            .layout()

        const musicText = new Text({
            baseParams: {
                scene,
                text: "Music",
                x: 0,
                y: 0,
            },
            options: {
                fontSize: 48,
                textColor: TextColor.Brown,
            },
        })
        this.scene.add.existing(musicText)
        this.musicSlider = new Slider({
            baseParams: {
                scene,
            },
            options: {
                valuechangeCallback: (value: number) => {
                    SceneEventEmitter.emit(SceneEventName.UpdateVolume, {
                        volume: value,
                    })
                },
            }
        })
        const musicSizer = this.scene.rexUI.add
            .sizer({
                orientation: "horizontal",
                space: {
                    item: 40,
                },
            })
            .add(musicText)
            .add(this.musicSlider)
            .layout()

        const ambientText = new Text({
            baseParams: {
                scene,
                text: "Ambient",
                x: 0,
                y: 0,
            },
            options: {
                fontSize: 48,
                textColor: TextColor.Brown,
            },
        })
        this.scene.add.existing(ambientText)
        const ambientCheckbox = new Checkbox({
            baseParams: {
                scene,
            },
            options: {
                checked: true,
                callback: (checked: boolean) => {
                    console.log(checked)
                },
            },
        })
        this.scene.add.existing(ambientCheckbox)
        const ambientSizer = this.scene.rexUI.add
            .sizer({
                orientation: "horizontal",
                space: {
                    item: 30,
                },
            })
            .add(ambientText)
            .add(ambientCheckbox)
            .layout()

        const sizer = this.scene.rexUI.add
            .sizer({
                orientation: "vertical",
                originY: 0,
                y: 60,
                space: {
                    item: 60,
                },
            })
            .add(soundSizer)
            .add(musicSizer)
            .add(ambientSizer)
            .layout()
        if (!this.background.container) {
            throw new Error("Background container not found")
        }
        this.background.container.addLocal(sizer)
    }
}
