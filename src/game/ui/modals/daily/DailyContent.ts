import { BaseAssetKey } from "@/game/assets"
import { DailyRewardId, DailyRewardInfo } from "@/modules/entities"
import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import { Background, BaseText, ModalBackground, XButton } from "../../elements"
import { onGameObjectPress } from "../../utils"
import { EventBus, EventName, ModalName, UpdateClaimModalMessage } from "@/game/event-bus"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"

export interface DailyRewardData {
    baseAssetKey: BaseAssetKey
}

export const GOLD_SCALE = 1.5
export const TOKEN_SCALE = 1.2

// daily coin icon map
const iconMap: Record<DailyRewardId, DailyRewardData> = {
    [DailyRewardId.Day1]: {
        baseAssetKey: BaseAssetKey.UIModalDailyCoin1,
    },
    [DailyRewardId.Day2]: {
        baseAssetKey: BaseAssetKey.UIModalDailyCoin1,
    },
    [DailyRewardId.Day3]: {
        baseAssetKey: BaseAssetKey.UIModalDailyCoin2,
    },
    [DailyRewardId.Day4]: {
        baseAssetKey: BaseAssetKey.UIModalDailyCoin3,
    },
    // temporary use the same icon
    [DailyRewardId.Day5]: {
        baseAssetKey: BaseAssetKey.IconDaily,
    }
}
export class DailyContent extends BaseSizer {
    private background: ModalBackground
    private rewardContainersSizer: Sizer
    private goldBaseAssetKey: BaseAssetKey
    private tokenBaseAssetKey: BaseAssetKey
    // daily rewards data
    private dailyRewardInfo: DailyRewardInfo
    constructor({ scene, x, y, width, height }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)

        this.goldBaseAssetKey = BaseAssetKey.UICommonIconCoin
        this.tokenBaseAssetKey = BaseAssetKey.UICommonIconCarrot

        // get the daily rewards data
        this.dailyRewardInfo = this.scene.cache.obj.get(CacheKey.DailyRewardInfo)
        this.background = new ModalBackground({
            baseParams: {
                scene,
            },
            options: {
                align: "center",
                container: {
                    showWrapperContainer: false,
                    showContainer: true,
                },
                onXButtonPress: (button: XButton) => {
                    onGameObjectPress({
                        gameObject: button,
                        onPress: () => {
                            EventBus.emit(EventName.CloseModal, {
                                modalName: ModalName.Daily
                            })
                        },
                        scene: this.scene,
                    })
                },
                title: "Daily",
                background: Background.Medium,
                mainButton: {
                    onPress: () => {
                        //call api
                    },
                    text: "Claim",
                }
            }
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        // create the reward containers
        this.rewardContainersSizer = this.scene.rexUI.add
            .sizer({
                orientation: "y",
                originY: 1,
                y: -80,
                space: {
                    item: 10,
                },
            })
            .add(this.createBaseDayRewardContainers())
            .add(this.createLastDayRewardContainer())
            .layout()
        if (!this.background.container) {
            throw new Error("Background container is not defined")
        }
        this.background.container.addLocal(this.rewardContainersSizer)
    }

    // create base day reward container
    private createBaseDayRewardContainer(id: DailyRewardId) {
        if (id === DailyRewardId.Day5) {
            throw new Error("Day 5 is not the base day")
        }
        // get the daily reward
        const dailyReward = this.dailyRewardInfo[id]
        if (!dailyReward) {
            throw new Error("Daily not found")
        }
        // add the background image
        const backgroundImage = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalDailyBaseDayAvatar
        )

        // add the day label
        const dayImage = this.scene.add.image(0, 0, BaseAssetKey.UIModalDailyDay)
        const dayText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: this.dailyRewardInfo[id].day.toString(),
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
            text: dayText,
            align: "center",
        }).layout()
        const { baseAssetKey } = iconMap[id]
        const icon = this.scene.add.image(0, 0, baseAssetKey)
        const quantityText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: `x${dailyReward.golds}`,
            },
            options: {
                enableStroke: true
            },
        })
        this.scene.add.existing(quantityText)
        const iconSizerContainer = this.scene.rexUI.add.container(0, 0)
        const iconSizer = this.scene.rexUI.add.sizer({
            y: 30,
            orientation: "y",
            originY: 1,
            space: {
                item: -20,
            },
        })
            .add(icon)
            .add(quantityText)
            .layout()
        iconSizerContainer.addLocal(iconSizer)

        const badgeLabel = this.scene.rexUI.add.badgeLabel({
            background: backgroundImage,
            width: backgroundImage.width,
            height: backgroundImage.height,
            leftTop: day,
            center: iconSizerContainer,
        }).layout().setInteractive().on("pointerdown", () => {
            const eventMessage: UpdateClaimModalMessage = {
                data: {
                    items: [
                        {
                            assetKey: this.goldBaseAssetKey,
                            quantity: dailyReward.golds,
                            stackable: true,
                            scale: GOLD_SCALE,
                        }
                    ]
                }
            }
            this.scene.events.emit(EventName.UpdateClaimModal, eventMessage)
            EventBus.emit(EventName.OpenModal, {
                modalName: ModalName.Claim
            })
        })
        return badgeLabel
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
            .addMultiple(containers).layout()
        return sizer
    }

    // create the last day reward container
    private createLastDayRewardContainer() {
        const id = DailyRewardId.Day5
        // add the background image
        const backgroundImage = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UIModalDailyLastDayAvatar
        )
        // add the day label
        const dayImage = this.scene.add.image(0, 0, BaseAssetKey.UIModalDailyDay)
        const dayText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: this.dailyRewardInfo[id].day.toString(),
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
            text: dayText,
            align: "center",
        }).layout()
        const { baseAssetKey } = iconMap[id]
        const icon = this.scene.add.image(0, 0, baseAssetKey)
        const iconSizerContainer = this.scene.rexUI.add.container(0, 0)
        const iconSizer = this.scene.rexUI.add.sizer({
            orientation: "y",
            space: {
                item: -20,
            },
        })
            .add(icon)
            .layout()
        iconSizerContainer.addLocal(iconSizer)

        const badgeLabel = this.scene.rexUI.add.badgeLabel({
            background: backgroundImage,
            width: backgroundImage.width,
            height: backgroundImage.height,
            leftTop: day,
            center: iconSizerContainer,
        }).layout().setInteractive().on("pointerdown", () => {
            const eventMessage: UpdateClaimModalMessage = {
                data: {
                    items: [
                        {
                            assetKey: this.goldBaseAssetKey,
                            quantity: this.dailyRewardInfo[id].golds,
                            stackable: true,
                            scale: GOLD_SCALE,
                        },
                        {
                            assetKey: this.tokenBaseAssetKey,
                            quantity: this.dailyRewardInfo[id].tokens,
                            stackable: true,
                            scale: TOKEN_SCALE,
                        }
                    ]
                }
            }
            this.scene.events.emit(EventName.UpdateClaimModal, eventMessage)
            EventBus.emit(EventName.OpenModal, {
                modalName: ModalName.Claim
            })
        })
        return badgeLabel
    }
}
