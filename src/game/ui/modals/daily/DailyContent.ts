import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { CacheKey, SizerBaseConstructorParams } from "../../../types"
import { BaseText, StrokeColor, TextColor } from "../../elements"
import { UISizer } from "../../UISizer"
import { BaseAssetKey } from "@/game/assets"
import { DailyRewardEntity, DailyRewardId } from "@/modules/entities"
import { onGameObjectClick } from "../../utils"
import { EventName } from "@/game/event-bus"
import { ModalName } from "../ModalManager"

// daily coin icon map
const iconMap: Record<DailyRewardId, BaseAssetKey> = {
    [DailyRewardId.Day1]: BaseAssetKey.ModalDailyCoin1,
    [DailyRewardId.Day2]: BaseAssetKey.ModalDailyCoin1,
    [DailyRewardId.Day3]: BaseAssetKey.ModalDailyCoin2,
    [DailyRewardId.Day4]: BaseAssetKey.ModalDailyCoin3,
    // temporary use the same icon
    [DailyRewardId.Day5]: BaseAssetKey.IconDaily,
}
export class DailyContent extends UISizer {
    private rewardContainersSizer: Sizer
    private closeButton: Phaser.GameObjects.Sprite | undefined
    // daily rewards data
    private dailyRewards: Array<DailyRewardEntity> = []
    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        // get the daily rewards data
        this.dailyRewards = this.scene.cache.obj.get(CacheKey.DailyRewards)

        // create the reward containers
        this.rewardContainersSizer = this.scene.rexUI.add
            .sizer({
                orientation: "y",
                x: this.x,
                y: this.y,
                space: {
                    item: 10,
                },
            })
            .add(this.createBaseDayRewardContainers())
            .add(this.createLastDayRewardContainer())
            .layout()
        // add the reward containers to the sizer
        this.add(this.rewardContainersSizer)

        // create the close button
        this.closeButton = this.createCloseButton()
    }

    // create the close button
    public createCloseButton() {
        // create the close button
        const closeButton = this.scene.add.sprite(0, 0, BaseAssetKey.ModalDailyIconClose)
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
        closeButton.setPosition(this.x + 380, this.y - 320)
        // add the close button to the sizer
        this.add(closeButton)
        return closeButton
    }

    // create base day reward container
    private createBaseDayRewardContainer(id: DailyRewardId) {
        if (id === DailyRewardId.Day5) {
            throw new Error("Day 5 is not the base day")
        }
        // get the daily reward
        const dailyReward = this.dailyRewards.find(
            (dailyReward) => dailyReward.id === id
        )
        if (!dailyReward) {
            throw new Error("Daily not found")
        }
        // create the background container
        const backgroundContainer = this.scene.add.container(0, 0)
        // add the background image
        const backgroundImage = this.scene.add.image(
            0,
            0,
            BaseAssetKey.ModalDailyBaseDayAvatar
        )
        // set the position and origin
        backgroundImage
            .setPosition(-backgroundImage.x / 2, -backgroundImage.y / 2)
            .setOrigin(0, 0)
        backgroundContainer.add(backgroundImage)
        
        // add the day label
        const dayImage = this.scene.add.image(0, 0, BaseAssetKey.ModalDailyDay)
        const dayText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: dailyReward.day.toString(),
            },
            options: {
                fontSize: 32,
            },
        })
        this.scene.add.existing(dayText)
        const day = this.scene.rexUI.add.label({
            width: dayImage.width,
            height: dayImage.height,
            background: dayImage,
            originX: 0,
            originY: 0,
            text: dayText,
            align: "center",
        }).layout()
            .setPosition(backgroundImage.x, backgroundImage.y)

        backgroundContainer.add(day)
        // set the position of the background container to the center
        backgroundContainer.setPosition(
            -backgroundContainer.width / 2,
            -backgroundContainer.height / 2
        )
        const wrapperBackgroundContainer = this.scene.add
            .container(0, 0)
            .add(
                backgroundContainer.setPosition(
                    -backgroundImage.width / 2,
                    -backgroundImage.height / 2
                )
            )

        // create the icon container
        const iconContainer = this.scene.add.container(0, 0)

        // create the container contains the icon, quantity and claimed status
        const icon = this.scene.add.image(0, -20, iconMap[id]).setScale(1.2)
        iconContainer.add(icon)

        // create the quantity text
        const quantityText = new BaseText({
            baseParams: {
                x: 0,
                y: 20,
                scene: this.scene,
                text: `x${dailyReward.golds}`,
            },
            options: {
                textColor: TextColor.White,
                fontSize: 40,
                enableStroke: true,
                strokeColor: StrokeColor.Chestnut,
            },
        })
        this.scene.add.existing(quantityText)
        iconContainer.add(quantityText)
        // create the claimed status
        // create the label
        const label = this.scene.rexUI.add.label({
            width: backgroundImage.width,
            height: backgroundImage.height,
            background: wrapperBackgroundContainer,
            icon: iconContainer,
            align: "center",
        })
        return label
    }

    // create the base day reward containers
    private createBaseDayRewardContainers() {
        const ids = Object.values(DailyRewardId).filter(
            (id) => id !== DailyRewardId.Day5
        )
        const containers = ids.map((id) => this.createBaseDayRewardContainer(id))
        const sizer = this.scene.rexUI.add
            .sizer({
                orientation: "x",
                space: {
                    item: 10,
                },
            })
            .addMultiple(containers)
        return sizer
    }

    // create the last day reward container
    private createLastDayRewardContainer() {
        const id = DailyRewardId.Day5
        // create the background container
        const backgroundContainer = this.scene.add.container(0, 0)
        // add the background image
        const backgroundImage = this.scene.add.image(
            0,
            0,
            BaseAssetKey.ModalDailyLastDayAvatar
        )
        // set the position and origin
        backgroundImage
            .setPosition(-backgroundImage.x / 2, -backgroundImage.y / 2)
            .setOrigin(0, 0)
        backgroundContainer.add(backgroundImage)
        // add the day image
        // add the day label
        const dayImage = this.scene.add.image(0, 0, BaseAssetKey.ModalDailyDay)
        const dayText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: "5",
            },
            options: {
                fontSize: 32,
            },
        })
        this.scene.add.existing(dayText)
        const day = this.scene.rexUI.add.label({
            width: dayImage.width,
            height: dayImage.height,
            background: dayImage,
            originX: 0,
            originY: 0,
            text: dayText,
            align: "center",
        }).layout()
            .setPosition(backgroundImage.x, backgroundImage.y)
        backgroundContainer.add(day)
        const wrapperBackgroundContainer = this.scene.add
            .container(0, 0)
            .add(
                backgroundContainer.setPosition(
                    -backgroundImage.width / 2,
                    -backgroundImage.height / 2
                )
            )
        // set the position of the background container to the center
        // create the container contains the icon, quantity and claimed status
        // create the icon container
        const iconContainer = this.scene.add.container(0, 0)
        const icon = this.scene.add.image(0, 0, iconMap[id])
        iconContainer.add(icon)
        // create the claimed status
        // create the label
        const label = this.scene.rexUI.add.label({
            width: backgroundImage.width,
            height: backgroundImage.height,
            background: wrapperBackgroundContainer,
            icon: iconContainer,
            align: "center",
        })
        return label
    }
}
