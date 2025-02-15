import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { CacheKey, SizerBaseConstructorParams } from "../../../../types"
import { EventName, UpdateInputQuantityModalMessage } from "@/game/event-bus"
import { InventorySchema, InventoryTypeSchema } from "@/modules/entities"
import { BaseAssetKey, inventoryTypeAssetMap } from "../../../../assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { calculateUiDepth, UILayer } from "@/game/layers"
import { BaseText } from "@/game/ui/elements"

const LABEL_SCALE = 1.5

export class InputQuantityContent extends BaseSizer {
    private background: Phaser.GameObjects.Image
    private inventoryTypes: Array<InventoryTypeSchema> = []
    private productLabel: Label
    private nameText: BaseText
    private iconContainer: ContainerLite
    constructor({ scene, x, y, height, width, config }: SizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)

        this.background = this.scene.add.image(0, 0, BaseAssetKey.ModalCommonBackground2)
        this.addLocal(this.background)

        const frame = this.scene.add.image(0, 0, BaseAssetKey.ModalCommonFrame)
        this.iconContainer = this.scene.rexUI.add.container(0, 0)
        this.productLabel = this.scene.rexUI.add.label({
            background: frame,
            width: frame.width,
            height: frame.height,
            align: "center",
            originY: 1,
            y: -100,
            icon: this.iconContainer, 
        }).setScale(LABEL_SCALE).layout()
        this.addLocal(this.productLabel)

        this.nameText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: -100,
                text: ""
            },
            options: {
                fontSize: 48,
                enableStroke: true,
            }
        }).setOrigin(0.5, 1).setPosition(0, 0)
        this.scene.add.existing(this.nameText)
        this.addLocal(this.nameText)

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

        const image = this.scene.add.image(0, 0, key).setDepth(calculateUiDepth({
            layer: UILayer.Modal,
            layerDepth: 2,
            additionalDepth: 2
        }))

        this.nameText.setText(name)

        this.iconContainer.clear(true)
        this.iconContainer.addLocal(image)  
    }
}
