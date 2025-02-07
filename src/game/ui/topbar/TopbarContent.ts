import { UserEntity } from "@/modules/entities"
import { Scene } from "phaser"
import { DeepPartial } from "react-hook-form"
import { BaseAssetKey } from "../../assets"
import { SceneAbstract } from "../../SceneAbstract"
import { BaseText, TextColor } from "../elements"
import { ProgressBar } from "../../../game/containers"

export class TopbarContent extends SceneAbstract {
    private userData: DeepPartial<UserEntity> | undefined

    constructor(scene: Scene) {
        super(scene)
        this.createInfoFrame()
    }

    private createInfoFrame() {
        const background = this.scene.add.image(0, 0, BaseAssetKey.TopbarInfo)
        
        // Create main sizer for two-column layout
        const mainContainer = this.scene.rexUI.add.sizer({
            x: this.leftX + 220,
            y: this.topY + 90,
            width: background.width,
            height: background.height,
            orientation: 0,
        }).addBackground(background)

        // Left column - Avatar
        const avatar = this.scene.add.image(0, 0, BaseAssetKey.TopbarAvatar).setDisplaySize(80, 80)
        const leftColumn = this.scene.rexUI.add.sizer({
            orientation: 1,
        }).add(avatar, { align: "center" })

        // Right column - Username and Level stacked vertically
        const username = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: this.userData?.username ?? "NAME",
            },
            options: {
                fontSize: 32,
                textColor: TextColor.Brown,
            },
        })
        this.scene.add.existing(username)

        const levelBox = this.scene.add.image(0, 0, BaseAssetKey.TopbarLevelBox).setDisplaySize(50, 50)
        const levelText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: -15,
                y: -10,
                text: this.userData?.level?.toString() ?? "18",
            },
            options: {
                fontSize: 24,
                textColor: TextColor.White,
            },
        })
        this.scene.add.existing(levelText)

        // Replace old level progress bar with ProgressBar component
        const experienceBar = new ProgressBar({
            baseParams: { scene: this.scene, x: 140, y: 140 },
            options: { progress: 0.5 },
        })
        this.scene.add.existing(experienceBar)

        // Experience bar layout with two columns
        const experienceContainer = this.scene.rexUI.add.sizer({
            orientation: 0, // Horizontal layout
        })
            .add(
                this.scene.rexUI.add.sizer({
                    orientation: 1,
                }).add(levelBox, { align: "center",
                    offsetY: 38,
                    offsetX: -5
                })
                    .add(levelText, { align: "center", offsetX: -5, offsetY: -5 })
                , { align: "left", padding: { right: 10 }, offsetX: -28, offsetY: -5 })
            .add(experienceBar, { align: "right", expand: true,
                offsetX: 30,
                offsetY: 20
            })

        const rightColumn = this.scene.rexUI.add.sizer({
            orientation: 1, // Vertical layout
        })
            .add(username, { align: "center", offsetX: -10, offsetY: 33 })
            .add(experienceContainer, { align: "center" })

        // Add both columns to main container
        mainContainer
            .add(leftColumn, { align: "left", padding: { right: 20, left: 50 } })
            .add(rightColumn, { align: "right", expand: true })
            .layout()

        return mainContainer
    }

    private addCurrencyList() {

    }

    private addCurrencyItem() {
        
    }

    // dem zo util sau
    private computeExperiencesQuota(level: number): number {
        //the formula to calculate the experience quota
        //compute first 10 levels
        // 1: 50
        // 2: 125
        // 3: 225
        // 4: 350
        // 5: 500
        // 6: 675
        // 7: 875
        // 8: 1100
        // 9: 1350
        // 10: 1625
        return 50 * level + 25 * Math.pow(level - 1, 2)
    }
}
