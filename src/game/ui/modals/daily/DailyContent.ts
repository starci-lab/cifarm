import { BaseAssetKey } from "@/game/assets"
import { DailyRewardId, DailyRewardInfo, UserSchema } from "@/modules/entities"
import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import { Background, BaseText, ModalBackground, XButton } from "../../elements"
import { onGameObjectPress } from "../../utils"
import { ClaimItem, EventBus, EventName, ModalName, UpdateClaimModalMessage } from "@/game/event-bus"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { GRAY_TINT_COLOR } from "@/game/constants"
import { MODAL_DEPTH_1 } from "../ModalManager"
import { isoUtcDateToLocale } from "@/modules/common"
import dayjs from "dayjs"

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
    private rewardContainersSizer: Sizer | undefined
    private user: UserSchema
    private goldBaseAssetKey: BaseAssetKey
    private tokenBaseAssetKey: BaseAssetKey
    // daily rewards data
    private dailyRewardInfo: DailyRewardInfo
    constructor({ scene, x, y, width, height }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, width, height)

        this.goldBaseAssetKey = BaseAssetKey.UICommonIconCoin
        this.tokenBaseAssetKey = BaseAssetKey.UICommonIconCarrot

        this.user = this.scene.cache.obj.get(CacheKey.User)

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
                        let id = DailyRewardId.Day5
                        if (this.user.dailyRewardStreak < 4) {
                            const ids = Object.values(DailyRewardId)
                            for (let i = 0; i < ids.length; i++) {
                                if (this.user.dailyRewardStreak + 1 === this.dailyRewardInfo[ids[i]].day) {
                                    id = ids[i]
                                    break
                                }
                            }
                        }
                        EventBus.once(EventName.ClaimDailyRewardCompleted, () => {
                            EventBus.emit(EventName.RefreshUser)
                            const items : Array<ClaimItem> = [{
                                assetKey: this.goldBaseAssetKey,
                                quantity: this.dailyRewardInfo[id].golds,
                                stackable: true,
                                scale: GOLD_SCALE,
                            }]
                            if (this.dailyRewardInfo[id].tokens) {
                                items.push({
                                    assetKey: this.tokenBaseAssetKey,
                                    quantity: this.dailyRewardInfo[id].tokens,
                                    stackable: true,
                                    scale: TOKEN_SCALE,
                                })
                            }      
                            const eventMessage: UpdateClaimModalMessage = {
                                data: {
                                    items
                                }
                            }
                            this.scene.events.emit(EventName.UpdateClaimModal, eventMessage)
                            EventBus.emit(EventName.OpenModal, {
                                modalName: ModalName.Claim
                            })
                        })
                        EventBus.emit(EventName.RequestClaimDailyReward)
                    },
                    text: "Claim",
                }
            }
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        if (!this.background.container) {
            throw new Error("Background container is not defined")
        }
        this.updateSizer()
        if (!this.rewardContainersSizer) {
            throw new Error("Reward container sizer is not defined")
        }

        EventBus.on(EventName.UserRefreshed, (user: UserSchema) => {
            this.user = user
            this.updateSizer()
        })
    }

    private checkClaimable() {
        if (!this.user.dailyRewardLastClaimTime) {
            throw new Error("Daily reward last claim time is not defined")
        }
        const day = dayjs(this.user.dailyRewardLastClaimTime)
        // get current utc date
        const utcNow = dayjs().utc()
        return !day.isSame(utcNow, "day")
    }

    private updateSizer() {
        if (this.rewardContainersSizer) {
            if (!this.background.container) {
                throw new Error("Background container is not defined")
            }
            this.background.container.remove(this.rewardContainersSizer, true)
        }
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
            .layout().setDepth(MODAL_DEPTH_1 + 1)
        if (!this.background.container) {
            throw new Error("Background container is not defined")
        }
        this.background.container.addLocal(this.rewardContainersSizer)
        
        if (!this.checkClaimable()) {
            if (!this.background.mainButton) {
                throw new Error("Main button is not defined")
            }
            this.background.mainButton.disable()
        } else {
            if (!this.background.mainButton) {
                throw new Error("Main button is not defined")
            }
            this.background.mainButton.enable()
        }
    }

    // create base day reward container
    private createBaseDayRewardContainer(id: DailyRewardId) {
        if (id === DailyRewardId.Day5) {
            throw new Error("Day 5 is not the base day")
        }
        const claimed = this.user.dailyRewardStreak >= this.dailyRewardInfo[id].day
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
        }).layout()

        if (claimed) {
            icon.setTint(GRAY_TINT_COLOR)
            quantityText.setTint(GRAY_TINT_COLOR)
            const image = this.scene.add.image(0, 0, BaseAssetKey.UICommonCheck)
            iconSizerContainer.addLocal(image)
        }
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
        }).layout()
        return badgeLabel
    }
}
