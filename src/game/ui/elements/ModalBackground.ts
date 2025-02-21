import {
    ConstructorParams,
    ContainerLiteBaseConstructorParams,
} from "@/game/types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText, TextColor } from "./BaseText"
import { BaseAssetKey } from "@/game/assets"
import { onGameObjectPress } from "../utils"

export enum Background {
  Large = "large",
  Medium = "medium",
}
export interface ModalBackgroundOptions {
  background: Background;
  title: string;
  onXButtonPress: () => void;
}
export class ModalBackground extends ContainerLite {
    private xButton: Label
    private titleText: BaseText
    private backgroundImage: Phaser.GameObjects.Image
    constructor({
        baseParams: { scene, children, height, width, x, y },
        options,
    }: ConstructorParams<
    ContainerLiteBaseConstructorParams,
    ModalBackgroundOptions
  >) {
        if (!options) {
            throw new Error("ModalBackground requires options")
        }
        super(scene, x, y, width, height, children)

        const { background, title, onXButtonPress } = options
        this.backgroundImage = scene.add.image(0, 0, background).setOrigin(0.5, 1)
        this.add(this.backgroundImage)

        this.titleText = new BaseText({
            baseParams: {
                scene,
                text: title,
                x: 0,
                y: 0,
            },
            options: {
                textColor: TextColor.DarkBrown
            }
        })
        this.scene.add.existing(this.titleText)
        this.add(this.titleText)

        const xButtonImage = scene.add.image(0, 0, BaseAssetKey.UIBackgroundXButton)
        this.xButton = this.scene.rexUI.add.label(
            {
                background: xButtonImage,
                width: xButtonImage.width,
                height: xButtonImage.height,
            }
        )
        this.xButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: this.xButton,
                onPress: onXButtonPress,
                animate: false,
                scene: this.scene,
            })
        })
        this.add(this.xButton)
    }
}
