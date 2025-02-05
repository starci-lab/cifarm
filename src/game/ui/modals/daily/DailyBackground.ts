import { BaseAssetKey } from "@/game/assets"
import { ContainerBaseConstructorParams } from "@/game/types"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText, StrokeColor } from "../../elements"

export class DailyBackground extends Phaser.GameObjects.Container {
    private wall: Phaser.GameObjects.Image
    private dailyTitle: Label
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
    }
}