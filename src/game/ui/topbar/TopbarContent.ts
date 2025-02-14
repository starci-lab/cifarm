import { UserSchema } from "@/modules/entities"
import { Scene } from "phaser"
import { ProgressBar } from "../../../game/containers"
import { BaseAssetKey } from "../../assets"
import { SceneAbstract } from "../../SceneAbstract"
import { BaseText, TextColor } from "../elements"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { CacheKey } from "@/game/types"
import { getScreenLeftX, getScreenTopY } from "../utils"
import { EventBus, EventName } from "@/game/event-bus"

export class TopbarContent extends SceneAbstract {
    private user: UserSchema
    
    private rightContainer : Sizer | undefined
    private energyLabel: Label | undefined
    private tokenLabel: Label | undefined
    private goldLabel: Label | undefined

    constructor(scene: Scene) {
        super(scene)

        this.user = this.scene.cache.obj.get(CacheKey.User)

        EventBus.on(EventName.UserRefreshed, (user: UserSchema) => {
            this.user = user
            // this.energyLabel?.setText(`${this.user.energy}/${this.computeExperiencesQuota(this.user.level)}`)
            // this.goldLabel?.setText(`${this.user.golds ?? 0}`)
            // this.tokenLabel?.setText(`${this.user.tokens ?? 0}`)
        })

        this.createInfoFrame()
        this.createRightContainer()
    }

    private createInfoFrame() {
        const background = this.scene.add.image(0, 0, BaseAssetKey.TopbarInfo)
        
        // Create main sizer for two-column layout
        const mainContainer = this.scene.rexUI.add.sizer({
            x: getScreenLeftX(this.scene) + 220,
            y: getScreenTopY(this.scene) + 90,
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
                text: this.user?.username ?? "NAME",
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
                text: this.user?.level?.toString() ?? "18",
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

    private createRightContainer() {
        this.energyLabel = this.addLabel({
            iconKey: BaseAssetKey.TopbarIconEnergy,
            amount: `${this.user.energy}/${this.computeExperiencesQuota(this.user.level)}`,
            scale: 0.7
        })
        this.goldLabel = this.addLabel({
            iconKey: BaseAssetKey.TopbarIconCoin,
            amount: `${this.user.golds ?? 0}`,
        })
        this.tokenLabel = this.addLabel({
            iconKey: BaseAssetKey.TopbarIconCarrot,
            amount: `${this.user.tokens ?? 0}`,
            scale: 0.9
        })
        this.rightContainer = this.scene.rexUI.add.sizer({
            x: getScreenLeftX(this.scene) + 750,
            y: getScreenTopY(this.scene) + 80,
            orientation: "horizontal",
        })
            .add(this.energyLabel)
            .add(this.goldLabel)
            .add(this.tokenLabel)
            .setItemSpacing(50).layout()
    }

    private addLabel({ iconKey, amount, scale = 1 }: AddLabelParams) {
        const background = this.scene.add.image(0, 0, BaseAssetKey.TopbarBackgroundCurrency)
        const iconContainer = this.scene.add.container(0, 0)
        const icon = this.scene.add.image(0, 0, iconKey).setScale(scale)
        iconContainer.add(icon)
        const amountText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: amount.toString(),
            },
            options: {
                fontSize: 24,
                textColor: TextColor.White,
            },
        })
        this.scene.add.existing(amountText)    
        const label = this.scene.rexUI.add.label({
            background,
            icon: iconContainer,
            text: amountText,
            width: 150,
            height: 50,
            expandTextWidth: true,
            expandTextHeight: true,
            space: {
                icon: 30,
                top: 2,
                bottom: 10,
            },
        })
        return label
    }

    private computeExperiencesQuota(level: number = 1): number {
        return 50 * level + 25 * Math.pow(level - 1, 2)
    }
}

interface AddLabelParams {
    iconKey: BaseAssetKey,
    scale?: number
    amount: string
}
