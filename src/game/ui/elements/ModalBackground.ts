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
  XLarge = "xlarge",
}
export interface ModalBackgroundOptions {
  background: Background;
  title: string;
  onXButtonPress: (xButton: Label) => void;
}
export class ModalBackground extends ContainerLite {
    public xButton: Label
    private titleText: BaseText
    private backgroundImage: Phaser.GameObjects.Image
    private uiContainer: ContainerLite
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
        const { background, title, onXButtonPress } = options
        super(scene, x, y, width, height, children)
        const backgroundMap: Record<Background, BaseAssetKey> = {
            [Background.Large]: BaseAssetKey.UIBackgroundLarge,
            [Background.Medium]: BaseAssetKey.UIBackgroundMedium,
            [Background.XLarge]: BaseAssetKey.UIBackgroundXLarge,
        }
        this.backgroundImage = this.scene.add.image(0, 0, backgroundMap[background]).setOrigin(0.5, 1)
        this.uiContainer = this.scene.rexUI.add.container(0, 0)
        this.addLocal(this.uiContainer)
        this.uiContainer.addLocal(this.backgroundImage)
        this.titleText = new BaseText({
            baseParams: {
                scene,
                text: title,
                x: 0,
                y: -(this.backgroundImage.height - 75),
            },
            options: {
                fontSize: 72,
                textColor: TextColor.DarkBrown
            }
        })
        scene.add.existing(this.titleText)
        this.uiContainer.addLocal(this.titleText)
        const xButtonImage = this.scene.add.image(0, 0, BaseAssetKey.UIBackgroundXButton).setPosition(this.backgroundImage.width / 2 - 75,-(this.backgroundImage.height - 75))
        this.xButton = this.scene.rexUI.add.label(
            {
                background: xButtonImage,
                width: xButtonImage.width,
                height: xButtonImage.height,
            }
        ).layout().setPosition(this.backgroundImage.width / 2 - 75,-(this.backgroundImage.height - 75))
        //.setPosition(0, -400)
        this.xButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: this.xButton,
                onPress: () => onXButtonPress(this.xButton),
                animate: false,
                scene: this.scene,
            })
        })
        this.uiContainer.addLocal(this.xButton)
    }
}
