import { BaseAssetKey } from "../../../assets"
import { ContainerBaseConstructorParams } from "../../../types"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText, StrokeColor } from "../../elements"
import { onGameObjectClick } from "../../utils"
import { EventName } from "../../../event-bus"
import { ModalName } from "../ModalManager"

export class DailyBackground extends Phaser.GameObjects.Container {
    private wall: Phaser.GameObjects.Image
    private dailyTitle: Label
    private closeButton: Phaser.GameObjects.Image | undefined

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)
        
        // create the wall
        this.wall = this.scene.add.image(0, 0, BaseAssetKey.ModalDailyWall)
        this.add(this.wall)

        // create the daily title
        const dailyTitle = this.scene.add.image(0, 0, BaseAssetKey.ModalDailyTitle)
        const text = new BaseText({
            baseParams: { 
                scene: this.scene,
                x: 0,
                y: 0,
                text: "Daily Reward",
            },
            options: {
                enableStroke: true,
                fontSize: 48,
                strokeColor: StrokeColor.RoyalPurple,
                strokeThickness: 6,
            }      
        })
        this.scene.add.existing(text)
        this.dailyTitle = this.scene.rexUI.add.label({
            width: dailyTitle.width,
            height: dailyTitle.height,
            background: dailyTitle,
            text,
            align: "center",  
        }).setInnerPadding({
            bottom: 40,
        }).layout().setPosition(0, -360)
        this.add(this.dailyTitle)

        // create the close button
        this.closeButton = this.createCloseButton()
    }

    // create the close button
    public createCloseButton() {
        // create the close button
        const closeButton = this.scene.add.sprite(0, 0, BaseAssetKey.ModalDailyIconClose).setOrigin(1, 0)
        this.scene.add.existing(closeButton)
        
        // add the on click event
        closeButton.setInteractive().on("pointerdown", () => {
            onGameObjectClick({
                gameObject: closeButton,
                onClick: () => {
                    this.scene.events.emit(EventName.CloseModal, ModalName.Daily)
                },
                scene: this.scene,
            })
        })
            
        // set the position of the close button
        closeButton.setPosition(this.wall.width / 2 - 100, - this.wall.height / 2 + 50)
        // add the close button to the sizer
        this.add(closeButton)
        return closeButton
    }
}