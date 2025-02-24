import { UserSchema } from "@/modules/entities"
import { ProgressBar } from "../loading"
import { BaseAssetKey } from "../../assets"
import { BaseText, TextColor } from "../elements"
import { Label, OverlapSizer, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseSizerBaseConstructorParams, CacheKey } from "@/game/types"
import { EventBus, EventName } from "@/game/event-bus"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"

export class Topbar extends BaseSizer {
    private background: Phaser.GameObjects.Image
    private user: UserSchema
    private profileContainer: OverlapSizer | undefined
    private resourcesContainer: Sizer | undefined
    private energyLabel: Label | undefined
    private tokenLabel: Label | undefined
    private goldLabel: Label | undefined
    private visited: boolean = false
    private neighbor: UserSchema | undefined
    constructor({
        scene,
        x,
        y,
        width,
        height,
    }: BaseSizerBaseConstructorParams) {
        const background = scene.add
            .image(0, 0, BaseAssetKey.UITopbarHeader)
            .setOrigin(0.5, 0)
        super(scene, x, y, width || background.width, height || background.height)
        this.background = background
        this.addLocal(background)

        this.user = this.scene.cache.obj.get(CacheKey.User)

        EventBus.on(EventName.UserRefreshed, (user: UserSchema) => {
            this.user = user
            this.updateContent()
        })

        EventBus.on(EventName.Visit, () => {
            this.visited = true
            this.neighbor = this.scene.cache.obj.get(CacheKey.VisitedNeighbor)
            this.updateContent()
            EventBus.emit(EventName.HideButtons)
        })

        EventBus.on(EventName.Return, () => {
            this.visited = false
            this.neighbor = undefined
            this.updateContent()
            EventBus.emit(EventName.ShowButtons)
        })

        this.updateContent()
    }

    private updateContent() {
        this.updateProfileContainer()
        this.updateResourcesContainer()
    }

    private updateProfileContainer() {
        if (this.profileContainer) {
            this.remove(this.profileContainer, true)
        }
        const user = this.visited ? this.neighbor : this.user

        const background = this.scene.add.image(0, 0, BaseAssetKey.UITopbarInfo)
        const avatarBackground = this.scene.add.image(0, 0, BaseAssetKey.UITopbarAvatar)
        // Left column - Avatar
        const avatar = this.scene.rexUI.add.label({
            background: avatarBackground,
            width: avatarBackground.width,
            height: avatarBackground.height,
        }).layout()
        const leftColumn = this.scene.rexUI.add
            .sizer({
                orientation: 1,
            })
            .add(avatar, { align: "center" }).layout()

        const dataBackground = this.scene.add.image(0, 0, BaseAssetKey.UITopbarData)
        // Right column - Username and Level stacked vertically
        const username = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: user?.username ?? "NAME",
            },
            options: {
                fontSize: 32,
                textColor: TextColor.Brown,
            },
        })
        this.scene.add.existing(username)

        const levelBox = this.scene.add.image(0, 0, BaseAssetKey.UITopbarLevelBox)
        const levelText = new BaseText({
            baseParams: {
                scene: this.scene,
                text: user?.level?.toString() ?? "1",
                x: 0,
                y: 0,
            },
            options: {
                fontSize: 24,
                textColor: TextColor.White,
            },
        })
        // Replace old level progress bar with ProgressBar component
        const experienceBar = new ProgressBar({
            baseParams: { scene: this.scene },
            options: { progress: 0.5 },
        })
        this.scene.add.existing(experienceBar)
        this.scene.add.existing(levelText)
        const levelLabel = this.scene.rexUI.add
            .label({
                background: levelBox,
                width: levelBox.width,
                height: levelBox.height,
                text: levelText,
                align: "center",
            })
            .layout()
        // Experience bar layout with two columns
        const experienceContainer = this.scene.rexUI.add
            .sizer({
                orientation: "x",
            })
            .add(levelLabel, {
                align: "center",
            })
            .add(experienceBar, {
                align: "center",
                offsetX: -5,
            })
            .layout()
            // .overlapSizer({
            //     width: dataBackground.width,
            //     height: dataBackground.height,
            //     space: {
            //         bottom: 20,
            //         left: 20,
            //         right: 20,
            //         top: 20,
            //     }
            // })
        console.log(background.width)
        const x = this.visited ? 0 : -(this.background.width / 2 - background.width / 2 - 10)
        const rightColumn = this.scene.rexUI.add
            .overlapSizer({
                width: dataBackground.width,
                height: dataBackground.height,
                space: {
                    bottom: 10,
                    left: 15,
                    right: 15,
                    top: 10,
                },
            })
            .addBackground(dataBackground)
            .add(username, { align: "left-top", expand: false, })
            .add(experienceContainer, { align: "left-bottom", expand: false, })
            .layout()
        this.profileContainer = this.scene.rexUI.add
            .overlapSizer({
                width: background.width,
                height: background.height,
                space: {
                    bottom: 30,
                    left: 18,
                    right: 18,
                    top: 15,
                },
                x,
                y: this.background.height / 2 + 10
            })
            .addBackground(background)
            .add(leftColumn, {
                align: "left-center",
                expand: false,
            })
            .add(rightColumn, {
                align: "right-center",
                expand: false,
            })
            .layout()
        this.addLocal(this.profileContainer)
    }

    private updateResourcesContainer() {
        if (this.resourcesContainer) {
            if (!this.goldLabel) {
                throw new Error("Gold label not found")
            } 
            if (!this.tokenLabel) {
                throw new Error("Token label not found")
            }
            if (!this.visited) {
                this.goldLabel.show()
                this.tokenLabel.show()
            } else {
                this.goldLabel.hide()
                this.tokenLabel.hide()
            }
            this.resourcesContainer.layout()
            return
        }
        this.energyLabel = this.addLabel({
            iconKey: BaseAssetKey.UITopbarIconEnergy,
            amount: `${this.user.energy}/${this.computeExperiencesQuota(
                this.user.level
            )}`,
            scale: 0.7,
        })
        this.goldLabel = this.addLabel({
            iconKey: BaseAssetKey.UITopbarIconCoin,
            amount: `${this.user.golds ?? 0}`,
        }).setVisible(!this.visited)
        this.tokenLabel = this.addLabel({
            iconKey: BaseAssetKey.UITopbarIconCarrot,
            amount: `${this.user.tokens ?? 0}`,
            scale: 0.9,
        }).setVisible(!this.visited)
        this.resourcesContainer = this.scene.rexUI.add
            .sizer({
                x: this.background.width / 2 - 50,
                y: this.background.height / 2 - 20,
                originX: 1,
                originY: 0.5,
                orientation: "h",
            })
            .add(this.energyLabel)
            .add(this.goldLabel)
            .add(this.tokenLabel)
            .setItemSpacing(50)
            .layout()
        this.addLocal(this.resourcesContainer)
    }

    private addLabel({ iconKey, amount, scale = 1 }: AddLabelParams) {
        const background = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UITopbarBackgroundCurrency
        )
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
  iconKey: BaseAssetKey;
  scale?: number;
  amount: string;
}
