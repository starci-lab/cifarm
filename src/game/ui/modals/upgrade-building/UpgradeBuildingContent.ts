import { UpgradeBuildingRequest } from "@/modules/apollo"
import { BuildingSchema, PlacedItemSchema, UserSchema } from "@/modules/entities"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey } from "../../../assets"
import { EventBus, EventName, ModalName } from "../../../event-bus"
import { BaseSizerBaseConstructorParams, CacheKey } from "../../../types"
import { Background, Text, ModalBackground, TextColor } from "../../elements"
import { createObjectId } from "@/modules/common"

export class UpgradeBuildingContent extends BaseSizer {
    private background: ModalBackground
    private mainContainer: Sizer
    private goldLabel: Label
    private levelText: Text
    private amountText: Text
    private buildings: Array<BuildingSchema>
    private currentUser: UserSchema
    private currentPlacedItemId: string = ""

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
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
                    EventBus.emit(EventName.CloseModal, { modalName: ModalName.UpgradeBuilding })
                },
                mainButton: {
                    onPress: () => {
                        const eventName: UpgradeBuildingRequest = {
                            placedItemBuildingId: this.currentPlacedItemId
                        }

                        EventBus.once(EventName.UpgradeBuildingCompleted, () => {
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

        this.amountText = new Text({
            baseParams: { scene, text: "0", x: 0, y: 0 },
            options: { fontSize: 30, textColor: TextColor.Brown }
        })
        this.scene.add.existing(this.amountText)
        
        this.mainContainer = this.scene.rexUI.add.sizer({
            orientation: "y",
            space: { item: 25 },
            originY: 0.5,
        })

        this.levelText = new Text({
            baseParams: { scene, text: "Current Level: 0", x: 0, y: 0 },
            options: { fontSize: 30, textColor: TextColor.Brown }
        }).setOrigin(0.5, 0)
        this.scene.add.existing(this.levelText)
        this.mainContainer.add(this.levelText, { align: "center" })

        this.goldLabel = this.createGoldLabel({
            iconKey: BaseAssetKey.UICommonIconCoin,
            amount: "0",
        })
        this.scene.add.existing(this.goldLabel)
        this.mainContainer.add(this.goldLabel, { align: "center" })

        this.mainContainer.layout()
        this.mainContainer.setPosition(0, -50) 

        if (!this.background.container) {
            throw new Error("Container not found")
        }
        this.background.container.add(this.mainContainer)

        this.buildings = this.scene.cache.obj.get(CacheKey.Buildings) as Array<BuildingSchema>
        this.currentUser = this.scene.cache.obj.get(CacheKey.User)

        EventBus.on(EventName.UpdateUpgadeBuildingModal, (placedItem: PlacedItemSchema) => {
            console.log("UpdateUpgadeBuildingModal", placedItem)
            this.render(placedItem) 
        })
    }

    private render(placedItem: PlacedItemSchema) {
        this.currentPlacedItemId = placedItem.id
        console.log("Buildings:", this.buildings)
        console.log("Placed Item:", placedItem)
        
        const buildingId = placedItem.placedItemType as string
        console.log("Building ID:", buildingId)
        const upgradeData = this.buildings.find(b => createObjectId(b.displayId) === buildingId)?.upgrades
    
        console.log("upgradeData", upgradeData)
    
        const currentUpgrade = placedItem.buildingInfo?.currentUpgrade ?? 0
        const upgradeCost = upgradeData?.find(u => u.upgradeLevel === currentUpgrade + 1)?.upgradePrice ?? 0

        this.levelText.setText(`Current Level: ${currentUpgrade} (Max: ${upgradeData?.length})`)
        this.amountText.setText(upgradeCost.toString())

        //if max level hidden
        if (currentUpgrade === upgradeData?.length) {
            this.goldLabel.setVisible(false)
            return
        }


    }

    private createGoldLabel({ iconKey, amount, scale = 1 }: CreateLabelParams): Label {
        const background = this.scene.add.image(0, 0, BaseAssetKey.UITopbarResource)
        const iconContainer = this.scene.add.container(0, 0)
        const icon = this.scene.add.image(0, 0, iconKey).setScale(scale)
        iconContainer.add(icon)

        this.amountText = new Text({
            baseParams: { scene: this.scene, x: 0, y: 0, text: amount.toString() },
            options: { fontSize: 28, textColor: TextColor.White }
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
    iconKey: BaseAssetKey;
    scale?: number;
    amount: string;
}
