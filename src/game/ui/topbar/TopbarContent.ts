import { UserEntity } from "@/modules/entities"
import { Scene } from "phaser"
import { DeepPartial } from "react-hook-form"
import { BaseAssetKey } from "../../assets"
import { SceneAbstract } from "../../SceneAbstract"
import { BaseText, TextColor } from "../elements"

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
        }).add(avatar, { align: "center", })

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
        }).setDepth(1)
        this.scene.add.existing(username)

        const levelBox = this.scene.add.image(0, 0, BaseAssetKey.TopbarLevelBox).setDisplaySize(40, 40)
        const levelText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: this.userData?.level?.toString() ?? "18",
            },
            options: {
                fontSize: 24,
                textColor: TextColor.White,
            },
        }).setDepth(1)
        this.scene.add.existing(levelText)

        const levelProgressBarBg = this.scene.add.image(0, 0, BaseAssetKey.TopbarLevelBarBackground).setDisplaySize(150, 20)
        const levelProgressBar = this.scene.add.image(0, 0, BaseAssetKey.TopbarLevelBar).setDisplaySize(120, 20)

        const levelContainer = this.scene.rexUI.add.overlapSizer({})
            .add(levelBox, { align: "center" })
            .add(levelText, { align: "center",
                offsetX: 200
            })

        const rightColumn = this.scene.rexUI.add.sizer({
            orientation: 1, // Vertical layout
        })
            .add(username, { align: "center",
                offsetX: -30,
                offsetY: 30
            })
            .add(levelContainer, { align: "center" })
            .add(levelProgressBarBg, { align: "center", expand: true })
            .add(levelProgressBar, { align: "center", expand: true })

        // Add both columns to main container
        mainContainer
            .add(leftColumn, { align: "left", padding: { right: 20, left: 50 } })
            .add(rightColumn, { align: "right", expand: true })
            .layout()

        return mainContainer
    }
}
