import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { CacheKey, BaseSizerBaseConstructorParams } from "../../../../types"
import { EventName, UpdateInputQuantityModalMessage } from "@/game/event-bus"
import { InventorySchema, InventoryTypeSchema } from "@/modules/entities"
import { BaseAssetKey, inventoryTypeAssetMap } from "../../../../assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText, Button, ButtonBackground, NumberInput } from "../../../elements"
import { MODAL_DEPTH_2 } from "../../ModalManager"

const LABEL_SCALE = 1.5

export class InputQuantityContent extends BaseSizer {
    private background: Phaser.GameObjects.Image
    private inventoryTypes: Array<InventoryTypeSchema> = []
    private productLabel: Label
    private nameText: BaseText
    private quantity = 1
    private numberInput: NumberInput
    private iconContainer: ContainerLite
    constructor({ scene, x, y, height, width, config }: BaseSizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.background = this.scene.add.image(0, 0, BaseAssetKey.UIModalCommonBackground2)
        this.addLocal(this.background)

        const frame = this.scene.add.image(0, 0, BaseAssetKey.UIModalCommonFrame)
        this.iconContainer = this.scene.rexUI.add.container(0, 0)
        this.productLabel = this.scene.rexUI.add.label({
            background: frame,
            width: frame.width,
            height: frame.height,
            align: "center",
            originY: 1,
            //y: 200,
            icon: this.iconContainer, 
        }).layout().setScale(LABEL_SCALE).setPosition(0, -150)
        this.addLocal(this.productLabel)

        this.nameText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: -50,
                text: ""
            },
            options: {
                fontSize: 48,
                enableStroke: true,
            }
        }).setOrigin(0.5, 1)
        this.scene.add.existing(this.nameText)
        this.addLocal(this.nameText)

        //const input = new Input(userNameField)
        this.numberInput = new NumberInput({
            baseParams: {
                scene: this.scene,
                config: {
                    originY: 0,
                }
            },
            options: {
                onChange: (value) => {
                    this.quantity = value
                },
                defaultValue: 1,
                showLeftArrow: true,
                showRightArrow: true,
            }
        })
        this.scene.add.existing(this.numberInput)
        this.addLocal(this.numberInput)

        const buttonContainer = this.scene.rexUI.add.container(0, 0).setOrigin(0.5, 0).setPosition(0, 225)
        const button = new Button({
            baseParams: {
                scene: this.scene,
            },
            options: {
                text: "Confirm",
                onPress: () => {
                    console.log("Confirm")
                },
                width: 300,
                background: ButtonBackground.Primary,
            }
        }).layout()
        buttonContainer.addLocal(button)

        this.scene.add.existing(button)
        this.addLocal(button)

        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)

        this.scene.events.on(EventName.UpdateInputQuantityModal, (message: UpdateInputQuantityModalMessage) => {
            this.render(message.inventory)
        })
    }

    public render(inventory: InventorySchema) {
        const inventoryType = this.inventoryTypes.find((type) => type.id === inventory.inventoryType)
        if (!inventoryType) {
            throw new Error("Inventory type not found")
        }
        const {
            textureConfig: { key }, name
        } = inventoryTypeAssetMap[inventoryType.displayId]

        const image = this.scene.add.image(0, 0, key).setDepth(MODAL_DEPTH_2 + 1)

        this.nameText.setText(name)

        this.numberInput.setBounds({
            min: 1,
            max: inventory.quantity,
        })
        this.iconContainer.clear(true)
        this.iconContainer.addLocal(image)  
    }
}
