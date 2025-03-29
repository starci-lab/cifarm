import {
    BuildingSchema,
    PlacedItemSchema,
    UserSchema,
} from "@/modules/entities"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey, baseAssetMap } from "../../../assets"
import { SceneEventEmitter, SceneEventName, ModalName } from "../../../events"
import {
    BaseSizerBaseConstructorParams,
    CacheKey,
    UpgradeModalData,
} from "../../../types"
import { Background, Text, ModalBackground, TextColor } from "../../elements"
import { createObjectId } from "@/modules/common"

export class UpgradeContent extends BaseSizer {
    private background: ModalBackground
    private mainContainer: Sizer
    private label: Label
    private levelText: Text
    private amountText: Text
    private buildings: Array<BuildingSchema>
    private user: UserSchema
    constructor({
        scene,
        x,
        y,
        height,
        width,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

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
                    SceneEventEmitter.emit(SceneEventName.CloseModal, {
                        modalName: ModalName.Upgrade,
                    })
                },
                mainButton: {
                    onPress: () => {
                        // const eventName: UpgradeBuildingRequest = {
                        //     placedItemBuildingId: this.currentPlacedItemId
                        // }
                        // SceneEventEmitter.once(SceneEventName.UpgradeBuildingResponsed, () => {
                        //     SceneEventEmitter.emit(SceneEventName.CloseModal, { modalName: ModalName.UpgradeBuilding })
                        // })
                        // SceneEventEmitter.emit(SceneEventName.RequestUpgradeBuilding, eventName)
                    },
                    text: "Upgrade",
                },
            },
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        this.amountText = new Text({
            baseParams: { scene, text: "0", x: 0, y: 0 },
            options: { fontSize: 30, textColor: TextColor.Brown },
        })
        this.scene.add.existing(this.amountText)

        this.mainContainer = this.scene.rexUI.add.sizer({
            orientation: "y",
            space: { item: 25 },
            originY: 0.5,
        })

        this.levelText = new Text({
            baseParams: { scene, text: "Current Level: 0", x: 0, y: 0 },
            options: { fontSize: 30, textColor: TextColor.Brown },
        }).setOrigin(0.5, 0)
        this.scene.add.existing(this.levelText)
        this.mainContainer.add(this.levelText, { align: "center" })

        this.label = this.createLabel({
            iconKey: baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.key,
            amount: "0",
        })

        this.scene.add.existing(this.label)
        this.mainContainer.add(this.label, { align: "center" })

        this.mainContainer.layout()
        this.mainContainer.setPosition(0, -50)

        if (!this.background.container) {
            throw new Error("Container not found")
        }
        this.background.container.add(this.mainContainer)

        this.buildings = this.scene.cache.obj.get(
            CacheKey.Buildings
        ) as Array<BuildingSchema>
        this.user = this.scene.cache.obj.get(CacheKey.User) as UserSchema

        SceneEventEmitter.on(SceneEventName.UpdateUpgradeModal, () => {
            const { placedItem } = this.scene.cache.obj.get(
                CacheKey.UpgradeModalData
            ) as UpgradeModalData
            this.render(placedItem)
        })
    }

    private render(placedItem: PlacedItemSchema) {
        const buildingId = placedItem.placedItemType as string
        const upgradeData = this.buildings.find(
            (b) => createObjectId(b.displayId) === buildingId
        )?.upgrades

        console.log("upgradeData", upgradeData)

        const currentUpgrade = placedItem.buildingInfo?.currentUpgrade ?? 0
        const upgradeCost =
      upgradeData?.find((u) => u.upgradeLevel === currentUpgrade + 1)
          ?.upgradePrice ?? 0

        this.levelText.setText(
            `Current Level: ${currentUpgrade} (Max: ${upgradeData?.length})`
        )
        this.amountText.setText(upgradeCost.toString())

        //if max level hidden
        if (currentUpgrade === upgradeData?.length) {
            this.label.setVisible(false)
            return
        }
    }

    private createLabel({
        iconKey,
        amount,
        scale = 1,
    }: CreateLabelParams): Label {
        const background = this.scene.add.image(
            0,
            0,
            baseAssetMap[BaseAssetKey.UITopbarResource].base.textureConfig.key
        )
        const iconContainer = this.scene.add.container(0, 0)
        const icon = this.scene.add.image(0, 0, iconKey).setScale(scale)
        iconContainer.add(icon)

        this.amountText = new Text({
            baseParams: { scene: this.scene, x: 0, y: 0, text: amount.toString() },
            options: { fontSize: 28, textColor: TextColor.White },
        })
        this.scene.add.existing(this.amountText)

        return this.scene.rexUI.add.label({
            background,
            icon: iconContainer,
            text: this.amountText,
            width: background.width,
            height: background.height,
            space: { icon: 40, top: -2, left: 10 },
        })
    }
}

interface CreateLabelParams {
  iconKey: string;
  scale?: number;
  amount: string;
}
