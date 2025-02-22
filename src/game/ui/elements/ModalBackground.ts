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
  onXButtonPress: () => void;
  tutorialConfig?: () => void;
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
        
        const { background, title, onXButtonPress, tutorialConfig } = options
        const backgroundMap: Record<Background, BaseAssetKey> = {
            [Background.Large]: BaseAssetKey.UIBackgroundLarge,
            [Background.Medium]: BaseAssetKey.UIBackgroundMedium,
            [Background.XLarge]: BaseAssetKey.UIBackgroundXLarge,
        }
        const backgroundImage = scene.add.image(0, 0, backgroundMap[background]).setOrigin(0.5, 1)
        super(scene, x, y, width ?? backgroundImage.width, height ?? backgroundImage.height, children)
        this.backgroundImage = backgroundImage
        this.addLocal(this.backgroundImage)

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
        this.scene.add.existing(this.titleText)
        this.addLocal(this.titleText)

        const xButtonImage = scene.add.image(0, 0, BaseAssetKey.UIBackgroundXButton)
        this.xButton = this.scene.rexUI.add.label(
            {
                background: xButtonImage,
                width: xButtonImage.width,
                height: xButtonImage.height,
            }
        ).setPosition(this.backgroundImage.width / 2 - 75, -(this.backgroundImage.height - 75)).layout()
        this.xButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: this.xButton,
                onPress: onXButtonPress,
                animate: false,
                scene: this.scene,
            })
        })
        this.addLocal(this.xButton)

        if (tutorialConfig) {
            tutorialConfig()
        }
    }
}
