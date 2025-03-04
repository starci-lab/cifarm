import { UpgradeBuildingRequest } from "@/modules/axios"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../../assets"
import { EventBus, EventName, ModalName } from "../../../event-bus"
import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import { Background, BaseText, Button, ModalBackground, TextColor } from "../../elements"

export class UpgradeBuildingContent extends BaseSizer {
    private background: ModalBackground
    private mainContainer: Sizer
    private userGold: number
    private upgradeCost: number
    private currentLevel: number
    private goldLabel: Label

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        // Lấy thông tin user và building
        const userData = this.scene.cache.obj.get(CacheKey.User)
        this.userGold = userData.golds ?? 0
        this.currentLevel = 1
        this.upgradeCost = 500

        // Background Modal
        this.background = new ModalBackground({
            baseParams: { scene, x: 0, y: 0, width, height },
            options: {
                container: {
                    showContainer: true,
                    showWrapperContainer: false,
                },
                align: "center",
                background: Background.Small,
                title: "Upgrade",
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, { modalName: ModalName.UpgradeBuilding })
                },
                mainButton: {
                    onPress: (button: Button) => {
                        if (this.userGold < this.upgradeCost) {
                            console.warn("Not enough gold to upgrade!")
                            return
                        }

                        const eventName: UpgradeBuildingRequest = {
                            placedItemBuildingId: "12"
                        }

                        EventBus.once(EventName.UpgradeBuildingCompleted, () => {
                            EventBus.emit(EventName.RefreshUser)
                            EventBus.emit(EventName.CloseModal, { modalName: ModalName.UpgradeBuilding })
                        })
                        EventBus.emit(EventName.RequestUpgradeBuilding, eventName)
                    },
                    text: "Upgrade",
                }
            }
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        // Main Container
        this.mainContainer = this.scene.rexUI.add.sizer({
            orientation: "y",
            space: { item: 25 },
            originY: 0.5,
        })

        // **Current Level Label** (Đặt lên top-center)
        const levelText = new BaseText({
            baseParams: { scene, text: `Current Level: ${this.currentLevel}`, x: 0, y: 0 },
            options: { fontSize: 30, textColor: TextColor.Brown }
        }).setOrigin(0.5, 0)
        this.scene.add.existing(levelText)
        this.mainContainer.add(levelText, { align: "center" })

        // **Gold Cost Label**
        this.goldLabel = this.createGoldLabel({
            iconKey: BaseAssetKey.UICommonIconCoin,
            amount: `${this.upgradeCost}`,
        })
        this.mainContainer.add(this.goldLabel, { align: "center" })

        // **Thêm container chính vào modal**
        this.mainContainer.layout()
        this.mainContainer.setPosition(0, -50) // Đẩy lên trên modal một chút

        if (!this.background.container) {
            throw new Error("Container not found")
        }
        this.background.container.add(this.mainContainer)
    }

    // **Hàm tạo Label Gold**
    private createGoldLabel({ iconKey, amount, scale = 1 }: CreateLabelParams): Label {
        const background = this.scene.add.image(0, 0, BaseAssetKey.UITopbarResource)
        const iconContainer = this.scene.add.container(0, 0)
        const icon = this.scene.add.image(0, 0, iconKey).setScale(scale)
        iconContainer.add(icon)

        const amountText = new BaseText({
            baseParams: { scene: this.scene, x: 0, y: 0, text: amount.toString() },
            options: { fontSize: 28, textColor: TextColor.White }
        })
        this.scene.add.existing(amountText)

        return this.scene.rexUI.add.label({
            background,
            icon: iconContainer,
            text: amountText,
            width: background.width,
            height: background.height,
            space: { icon: 40, top: -2 },
        })
    }
}

interface CreateLabelParams {
    iconKey: BaseAssetKey;
    scale?: number;
    amount: string;
}
