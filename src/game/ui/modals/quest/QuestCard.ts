import { BaseAssetKey } from "@/game/assets"
import { ConstructorParams, OverlapBaseSizerBaseConstructorParams } from "@/game/types"
import { OverlapSizer, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText, Button } from "../../elements"
import { ProgressBar } from "../../loading"

export interface QuestCardOptions {
    // onclick callback
    onPress: () => void;
    // quest title
    title: string;
    // button text
    buttonText?: string;
    // done
    done?: boolean;
}

export class QuestCard extends OverlapSizer {
    private cardBackground: Phaser.GameObjects.Image
    private done: boolean
    constructor({ baseParams: { scene }, options }: ConstructorParams<OverlapBaseSizerBaseConstructorParams, QuestCardOptions>) {
        if (!options) {
            throw new Error("QuestCard requires options")
        }
        const { onPress, title, buttonText, done } = options

        const cardBackground = scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalQuestCardItem
        )
        const pin = scene.add
            .image(0, 0, BaseAssetKey.UIModalQuestPin)
            .setPosition(-cardBackground.width / 2 + 10, -cardBackground.height / 2 + 10)

        super(scene, {
            width: cardBackground.width,
            height: cardBackground.height,
        })

        this.cardBackground = cardBackground

        this.addBackground(cardBackground)
        this.addLocal(pin)

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

        this.addLocal(
            titleLabel.setPosition(
                -cardBackground.width / 2 + 50,
                -cardBackground.height / 2
            )
        )
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
        if (done) {
            button.disable()
        }
        scene.add.existing(button)
        this.addLocal(button)

        this.done = done || false

        this.layout()
    }

    public addProgress({ progress, text }: AddProgressParams): this {
        // add progress
        const content = this.scene.rexUI.add.sizer({
            orientation: "vertical",
            originX: 0,
            originY: 1,
            space: {
                item: 10,
            },
        })
        //create the progress bar
        const progressBar = new ProgressBar({
            baseParams: {
                scene: this.scene,
                config: {
                    originX: 0,
                },
            },
            options: {
                progress,
            },
        }).layout()
        this.scene.add.existing(progressBar)
        content.add(progressBar, {
            align: "left-bottom",
        })
        // create text
        const textObj = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text
            },
            options: {
                fontSize: 24,
                enableStroke: true,
            },
        }).setOrigin(0, 0.5)
        this.scene.add.existing(textObj)
        content.add(textObj, {
            align: "left-bottom",
        })
        content.layout()

        this.addLocal(
            content.setPosition(
                -this.cardBackground.width / 2 + 20,
                this.cardBackground.height / 2 - 20
            )
        )

        return this
    }

    private createDoneContent(emptyContent: Sizer) {
        const doneImage = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UICommonCheck
        )
        const doneScale = 50 / doneImage.height
        const doneLabel = this.scene.rexUI.add.label({
            background: doneImage,
            width: doneScale * doneImage.width,
            height: doneScale * doneImage.height,
        })
        emptyContent.add(doneLabel)
        // create text
        const textObj = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: "Completed",
            },
            options: {
                fontSize: 32,
                enableStroke: true,
            },
        }).setOrigin(0, 0.5)
        this.scene.add.existing(textObj)
        emptyContent.add(textObj)
    }

    public addReward({ quantity }: AddRewardParams): this {
        // add progress
        const content = this.scene.rexUI.add.sizer({
            orientation: "horizontal",
            originX: 0,
            height: 32,
            originY: 1,
            space: {
                item: 10,
            },
        })
        
        if (this.done) {
            this.createDoneContent(content)
        } else {
            // create text
            const textObj = new BaseText({
                baseParams: {
                    scene: this.scene,
                    x: 0,
                    y: 0,
                    text: `+${quantity}`,
                },
                options: {
                    fontSize: 32,
                    enableStroke: true,
                },
            }).setOrigin(0, 0.5)
            this.scene.add.existing(textObj)
            content.add(textObj)

            const tokenImage = this.scene.add.image(
                0,
                0,
                BaseAssetKey.UICommonIconCarrot
            )
            const iconScale = 50 / tokenImage.height
            const token = this.scene.rexUI.add
                .label({
                    background: tokenImage,
                    width: iconScale * tokenImage.width,
                    height: iconScale * tokenImage.height,
                })
                .layout()
            content.add(token)
        }
        content.layout()

        this.addLocal(
            content.setPosition(
                -this.cardBackground.width / 2 + 20,
                this.cardBackground.height / 2 - 20
            )
        )

        return this
    }
}

export interface AddRewardParams {
    quantity: number
}

export interface AddProgressParams {
    progress: number, 
    text: string
}