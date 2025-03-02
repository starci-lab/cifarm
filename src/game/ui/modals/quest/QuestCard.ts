import { BaseAssetKey } from "@/game/assets"
import { BaseSizerBaseConstructorParams, ConstructorParams } from "@/game/types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText, Button } from "../../elements"

export interface QuestCardOptions {
    // onclick callback
    onPress: () => void;
    // quest title
    title: string;
    // content
    content?: ContainerLite;
    // button text
    buttonText?: string;
}

export class QuestCard extends Sizer {
    constructor({ baseParams: { scene }, options }: ConstructorParams<BaseSizerBaseConstructorParams, QuestCardOptions>) {
        if (!options) {
            throw new Error("QuestCard requires options")
        }
        const { onPress, title, content, buttonText } = options

        const cardBackground = scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalQuestCardItem
        )
        const pin = scene.add
            .image(0, 0, BaseAssetKey.UIModalQuestPin)
            .setPosition(-cardBackground.width / 2 + 10, -cardBackground.height / 2 + 10)

        const questCardTitle = scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalQuestCardTitle
        )
        const titleText = new BaseText({
            baseParams: {
                scene,
                x: 0,
                y: 0,
                text: title,
            },
            options: {
                enableStroke: true,
                fontSize: 32,
            },
        })
        scene.add.existing(titleText)

        super(scene, {
            orientation: "x",
            width: cardBackground.width,
            height: cardBackground.height,
        })

        this.addBackground(cardBackground)
        this.addLocal(pin)
        const titleLabel = scene.rexUI.add
            .label({
                background: questCardTitle,
                text: titleText,
                originX: 0,
                height: questCardTitle.height,
                width: questCardTitle.width,
                align: "center",
            })
            .layout()

        this.layout()

        this.addLocal(
            titleLabel.setPosition(
                -cardBackground.width / 2 + 50,
                -cardBackground.height / 2 + 15
            )
        )
        if (content) {
            this.addLocal(
                content.setPosition(
                    -cardBackground.width / 2 + 40,
                    cardBackground.height / 2 - 40
                )
            )
            this.bringChildToTop(content)
        }

        const button = new Button({
            baseParams: {
                scene,
                config: {
                    originX: 1,
                    x: cardBackground.width / 2 - 40,
                }
            },
            options: {
                text: buttonText || "Claim",
                onPress, 
                syncTextScale: true, 
                scale: 0.8,
                width: 300,
                height: 120,
            }
        }).layout()
        scene.add.existing(button)
        this.addLocal(button)
    }
}
