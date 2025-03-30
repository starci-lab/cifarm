import {
    BuildingSchema,
    PlacedItemSchema,
    PlacedItemTypeSchema,
    UserSchema,
} from "@/modules/entities"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey, baseAssetMap } from "../../../assets"
import {
    SceneEventEmitter,
    SceneEventName,
    ModalName,
    ExternalEventEmitter,
    ExternalEventName,
} from "../../../events"
import {
    BaseSizerBaseConstructorParams,
    CacheKey,
    UpgradeModalData,
} from "../../../types"
import { Background, ModalBackground, ResourceLabel } from "../../elements"
import { UpgradeBuildingMessage } from "@/hooks/io/emitter"
import { createMainVisual } from "@/game/tilemap"
import { SpineGameObject } from "@esotericsoftware/spine-phaser"

export class UpgradeContent extends BaseSizer {
    private background: ModalBackground
    private user: UserSchema
    private buildings: Array<BuildingSchema>
    private placedItemTypes: Array<PlacedItemTypeSchema>
    private placedItem: PlacedItemSchema | undefined

    // large frame and resource label will stay in the sizer
    private sizer: Sizer
    private frameSizer: Sizer
    private resourceLabel: ResourceLabel
    private mainVisual: Phaser.GameObjects.Sprite | SpineGameObject | undefined
    private starsSizer: Sizer
    constructor({
        scene,
        x,
        y,
        height,
        width,
        config,
    }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.user = this.scene.cache.obj.get(CacheKey.User) as UserSchema
        this.buildings = this.scene.cache.obj.get(
            CacheKey.Buildings
        ) as Array<BuildingSchema>
        // Background Modal
        this.background = new ModalBackground({
            baseParams: { scene, x: 0, y: 0, width, height },
            options: {
                container: {
                    showContainer: true,
                    showWrapperContainer: false,
                },
                align: "center",
                background: Background.Medium,
                title: "Upgrade",
                onXButtonPress: () => {
                    SceneEventEmitter.emit(SceneEventName.CloseModal, {
                        modalName: ModalName.Upgrade,
                    })
                },
                mainButton: {
                    onPress: () => {
                        if (!this.placedItem) {
                            throw new Error("Placed item not found.")
                        }
                        const eventMessage: UpgradeBuildingMessage = {
                            placedItemBuildingId: this.placedItem.id,
                        }
                        SceneEventEmitter.emit(SceneEventName.CloseModal, {
                            modalName: ModalName.Upgrade,
                        })
                        ExternalEventEmitter.emit(
                            ExternalEventName.RequestUpgradeBuilding,
                            eventMessage
                        )
                    },
                    text: "OK",
                },
            },
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        this.placedItemTypes = this.scene.cache.obj.get(
            CacheKey.PlacedItemTypes
        ) as Array<PlacedItemTypeSchema>

        this.sizer = this.scene.rexUI.add.sizer({
            orientation: "vertical",
            originY: 0,
            space: {
                item: 40,
            },
            y: 60,
        })

        // add frame sizer
        const backgroundFrame = this.scene.add.image(
            0,
            0,
            baseAssetMap[BaseAssetKey.UICommonLargeFrame].base.textureConfig.key
        )
        this.frameSizer = this.scene.rexUI.add.sizer({
            width: backgroundFrame.width,
            height: backgroundFrame.height,
        })
        this.frameSizer.addBackground(backgroundFrame)
        this.frameSizer.layout()
        this.sizer.add(this.frameSizer)

        // add stars sizer
        this.starsSizer = this.scene.rexUI.add.sizer({
            orientation: "horizontal",
            y: - backgroundFrame.height / 2 + 30,
            space: {
                item: 20,
            },
        })
        this.frameSizer.addLocal(this.starsSizer)

        this.resourceLabel = new ResourceLabel({
            baseParams: {
                scene,
            },
            options: {
                text: "",
                iconKey:
          baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.key,
            },
        })
        this.scene.add.existing(this.resourceLabel)
        this.sizer.add(this.resourceLabel)
        this.sizer.layout()
        this.background.container?.addLocal(this.sizer)

        SceneEventEmitter.on(SceneEventName.UpdateUpgradeModal, () => {
            const { placedItem, mapAssetData } = this.scene.cache.obj.get(
                CacheKey.UpgradeModalData
            ) as UpgradeModalData
            if (!placedItem) {
                throw new Error("Placed item is undefined")
            }
            this.placedItem = placedItem
            const { scaleX = 1, scaleY = 1 } = { ...mapAssetData.modalScale }
            if (this.mainVisual) {
                this.mainVisual.destroy()
            }
            this.mainVisual = createMainVisual({
                ...mapAssetData,
                scene: this.scene,
            }).setDepth(this.depth + 1).setScale(scaleX, scaleY)
            this.mainVisual.setY(backgroundFrame.width / 2 - 30)
            this.frameSizer.addLocal(this.mainVisual)

            const placedItemType = this.placedItemTypes.find(
                (placedItemType) => placedItemType.id === placedItem.placedItemType
            )
            if (!placedItemType) {
                throw new Error("Placed item type not found")
            }
            const building = this.buildings.find(
                (building) => building.id === placedItemType.building
            )
            if (!building) {
                throw new Error("Building not found.")
            }
            const upgrades = building.upgrades
            this.placedItem = placedItem
            const currentUpgrade = this.placedItem.buildingInfo?.currentUpgrade ?? 0
            const upgrade = upgrades?.find(
                (upgrade) => upgrade.upgradeLevel === currentUpgrade + 1
            )
            if (!upgrade) {
                throw new Error("Upgrade not found.")
            }
            const upgradePrice = upgrade.upgradePrice
            if (!upgradePrice) {
                throw new Error("Upgrade price not found.")
            }
            this.resourceLabel.amountText.setText(upgradePrice.toString())

            // check
            // add stars
            this.starsSizer.removeAll(true)
            for (let i = 0; i < 3; i++) {
                let starAssetKey: BaseAssetKey
                if (i < currentUpgrade) {
                    starAssetKey = BaseAssetKey.UICommonPurpleStar
                } else if (i === currentUpgrade) {
                    starAssetKey = BaseAssetKey.UICommonUpgradeStar
                } else {
                    starAssetKey = BaseAssetKey.UICommonFadeStar
                }
                const star = this.scene.add.image(
                    0,
                    0,
                    baseAssetMap[starAssetKey].base.textureConfig.key
                ).setDepth(this.depth + 2)
                this.starsSizer.add(star)
            }
            this.starsSizer.layout()
        })
    }
}
