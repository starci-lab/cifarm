import { TutorialStep } from "@/modules/entities"
import { tutorialStepMap } from "./config"
import { SceneAbstract } from "../../SceneAbstract"
import { Scene } from "phaser"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "@/game/assets"
import { BaseText, NinePatch3x3, TextColor } from "../elements"
import { sleep } from "@/modules/common"

export class Stacy extends SceneAbstract {
    private stacyImage: Phaser.GameObjects.Image | undefined
    private stacyBubble: Label | undefined
    private pressToContinueText: Phaser.GameObjects.Text | undefined

    constructor(scene: Scene) {
        super(scene)

        this.pressToContinueText = new BaseText(
            {
                baseParams: {
                    scene: this.scene,
                    text: "Press to continue",
                    x: this.centerX,
                    y: this.bottomY - 50
                },
            }    
        ).setOrigin(0.5, 1).setDepth(1).setActive(false).setVisible(false)
        this.scene.add.existing(this.pressToContinueText)
    }

    // allow the player to press to continue
    private allowPressToContinue() {
        this.pressToContinueText?.setVisible(true).setActive(true)
    }

    // disallow the player to press to continue
    private disallowPressToContinue(hidePressToContinueIfAllowed = false) {
        if (hidePressToContinueIfAllowed) {
            return
        }
        this.pressToContinueText?.setVisible(false).setActive(false)
    }

    // render the stacy image
    public render(step: TutorialStep) {
        // if press to continue is true, turn it off
        this.disallowPressToContinue(true)
        // set continue to false
        if (!this.stacyImage) {
            this.stacyImage = this.scene.add
                .image(
                    this.centerX,
                    this.bottomY - 50,
                    tutorialStepMap[step].assetKey
                ).setDepth(1)
                .setOrigin(0.5, 1)
        }
        const texture = tutorialStepMap[step].assetKey
        this.stacyImage.setTexture(texture)

        if (!this.stacyBubble) {
            // add nine patch
            const bubbleNinePatch = new NinePatch3x3({
                baseParams: {
                    scene: this.scene,
                },
                options: {
                    assetKey: BaseAssetKey.Bubble,
                    bottomHeight: 80,
                    leftWidth: 80,
                    rightWidth: 80,
                    topHeight: 80,
                }
            })
            this.scene.add.existing(bubbleNinePatch)
            const text = new BaseText({
                baseParams: {
                    scene: this.scene,
                    text: "",
                    x: 0,
                    y: 0,
                    style: {
                        wordWrap: { width: 800}
                    }
                },
                options: {
                    textColor: TextColor.Brown,
                    fontSize: 48
                }
            })
            // add the text
            this.scene.add.existing(text)
            this.stacyBubble = this.scene.rexUI.add.label({
                background: bubbleNinePatch,
                text,
                x: this.centerX,
                y: this.topY + 200,
                originX: 0.5,
                originY: 0,
            }).setInnerPadding({
                bottom: 80,
                left: 80,
                right: 80,
                top: 80,
            }).setMinHeight(500).setMinWidth(500).layout().setDepth(1)

            this.playSetTextAnimation(tutorialStepMap[step].message)
        }
    }

    private async playSetTextAnimation(fullText: string) {
        // we cut the text into characters
        const characters = fullText.split("")
        // we create an empty string
        let text = ""
        // we iterate over the characters
        for (let i = 0; i < characters.length; i++) {
            // we add the character to the text
            text += characters[i]
            // we set the text of the stacy bubble
            this.stacyBubble?.setText(text).layout()
            // we wait 30ms before adding the next character
            await sleep(30)
        }
        // we allow the player to press to continue
        this.allowPressToContinue()
    }
}
