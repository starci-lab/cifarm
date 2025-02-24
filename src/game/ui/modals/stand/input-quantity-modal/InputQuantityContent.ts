import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { CacheKey, BaseSizerBaseConstructorParams } from "../../../../types"
import { CloseModalMessage, EventBus, EventName, ModalName, UpdateInputQuantityModalMessage } from "../../../../event-bus"
import { InventorySchema, InventoryTypeSchema } from "@/modules/entities"
import { BaseAssetKey, inventoryTypeAssetMap } from "../../../../assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { Background, Button, ButtonBackground, ModalBackground, NumberInput } from "../../../elements"
import { MODAL_DEPTH_2 } from "../../ModalManager"
import { DeliverProductRequest } from "@/modules/axios"
import { restoreTutorialDepth, setTutorialDepth } from "@/game/ui/tutorial"

export class InputQuantityContent extends BaseSizer {
    private background: ModalBackground
    private inventoryTypes: Array<InventoryTypeSchema> = []
    private productLabel: Label
    private quantity = 1
    private numberInput: NumberInput
    private mainContainer: Sizer
    private iconContainer: ContainerLite
    private inventory: InventorySchema | undefined
    private button: Button

    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.background = new ModalBackground({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                width,
                height,
            },
            options: {
                container: {
                    showContainer: true,
                    showWrapperContainer: false,
                },
                align: "center",
                background: Background.Small,
                title: "Quantity",
                titleFontSize: 48,
                onXButtonPress: () => {
                    EventBus.emit(EventName.CloseModal, {
                        modalName: ModalName.InputQuantity,
                    })
                },
            }
        })
        this.scene.add.existing(this.background)
        this.addLocal(this.background)

        this.mainContainer = this.scene.rexUI.add.sizer({
            orientation: "y",
            space: { item: 40 },
            originY: 1,
        })
        const frame = this.scene.add.image(0, 0, BaseAssetKey.UIModalCommonFrame)
        this.iconContainer = this.scene.rexUI.add.container(0, 0)
        this.productLabel = this.scene.rexUI.add.label({
            background: frame,
            width: frame.width,
            height: frame.height,
            align: "center",
            icon: this.iconContainer, 
        }).layout()
        this.mainContainer.add(this.productLabel)
        //const input = new Input(userNameField)
        this.numberInput = new NumberInput({
            baseParams: {
                scene: this.scene,
            },
            options: {
                onChange: (value) => {
                    this.quantity = value
                },
                defaultValue: 1,
                showLeftArrow: true,
                showRightArrow: true,
            }
        }).layout()
        this.scene.add.existing(this.numberInput)
        this.mainContainer.add(this.numberInput)

        this.button = new Button({
            baseParams: {
                scene: this.scene,
            },
            options: {
                text: "Confirm",
                onPress: () => {
                    if (!this.inventory) {
                        throw new Error("Inventory is not set")
                    }
                    EventBus.on(EventName.DeliverProductCompleted, () => {
                        this.scene.events.emit(EventName.CloseModal)
                    })
                    const index = this.scene.cache.obj.get(CacheKey.DeliveryIndex)
                    const eventName: DeliverProductRequest = {
                        quantity: this.quantity,
                        inventoryId: this.inventory.id,
                        index
                    }

                    EventBus.once(EventName.DeliverProductCompleted, () => {
                        EventBus.emit(EventName.RefreshInventories)
                        const eventMessage: CloseModalMessage = { 
                            modalName: ModalName.InputQuantity
                        }
                        EventBus.emit(EventName.CloseModal, eventMessage)
                    })
                    EventBus.emit(EventName.RequestDeliverProduct, eventName)
                    if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
                        restoreTutorialDepth({
                            gameObject: this.button,
                            scene: this.scene,
                        })
                        this.scene.events.emit(EventName.TutorialPrepareCloseStand)
                    }
                },
                width: 300,
                background: ButtonBackground.Primary,
            }
        }).layout()
        this.scene.add.existing(this.button)
        this.mainContainer.add(this.button)
        this.mainContainer.setY(this.background.backgroundImage.height / 2 + this.button.height / 2 - 20)
        this.mainContainer.layout()
        this.addLocal(this.mainContainer)

        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)
        this.scene.events.on(EventName.UpdateInputQuantityModal, ({ inventory }: UpdateInputQuantityModalMessage) => {
            this.render(inventory)
        })
    }

    public render(inventory: InventorySchema) {
        // set the inventory
        this.inventory = inventory

        const inventoryType = this.inventoryTypes.find((type) => type.id === inventory.inventoryType)
        if (!inventoryType) {
            throw new Error("Inventory type not found")
        }
        const {
            textureConfig: { key }
        } = inventoryTypeAssetMap[inventoryType.displayId]

        const image = this.scene.add.image(0, 0, key).setDepth(MODAL_DEPTH_2 + 1)

        this.numberInput.setBounds({
            min: 1,
            max: inventory.quantity,
        })
        this.iconContainer.clear(true)
        this.iconContainer.addLocal(image)  

        if (this.scene.cache.obj.get(CacheKey.TutorialActive)) {
            setTutorialDepth({
                gameObject: this.button,
                scene: this.scene,
            })
        }
    }
}
