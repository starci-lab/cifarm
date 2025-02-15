import { BaseAssetKey } from "../../../assets"
import { CacheKey, SizerBaseConstructorParams } from "../../../types"
import { IPaginatedResponse } from "@/modules/apollo/types"
import { DeliveringProductSchema } from "@/modules/entities"
import { GridSizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { onGameObjectPress } from "../../utils"
import { EventBus, EventName, ModalName, OpenModalMessage } from "../../../event-bus"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"

const ROW_COUNT = 3
const COLUMN_COUNT = 3
const CELL_COUNT = ROW_COUNT * COLUMN_COUNT

export class StandContent extends BaseSizer {
    private gridSizer: GridSizer | undefined
    private deliveringProducts: Array<DeliveringProductSchema> = []

    constructor({
        scene,
        x,
        y,
        config,
        height,
        width
    }: SizerBaseConstructorParams) {
        super(scene, x, y, height, width, config) 

        const { data } = this.scene.cache.obj.get(
            CacheKey.DeliveringProducts
        ) as IPaginatedResponse<DeliveringProductSchema>
        this.deliveringProducts = data
        //this.createStandGrid()

        this.updateStandGridSizer()
    }

    // get the items
    private getItems = (): Array<DeliveringProductSchema | null> => {
        const result: Array<DeliveringProductSchema | null> = []
        for (let i = 0; i < CELL_COUNT; i++) {
            if (this.deliveringProducts[i]) {
                result.push(this.deliveringProducts[i])
            } else {
                result.push(null)
            }
        }
        return result
    }

    private updateStandGridSizer() {
        const items = this.getItems()
        const background = this.scene.add.image(0, 0, BaseAssetKey.ModalStand)
        // Create Fixed Grid Table
        this.gridSizer = this.scene.rexUI.add
            .gridSizer({
                width: background.width,
                height: background.height,
                column: COLUMN_COUNT,
                row: ROW_COUNT,
                columnProportions: 1,
                rowProportions: 1,
                createCellContainerCallback: (scene, x, y) => {
                    const item = items[y * COLUMN_COUNT + x]
                    const container = scene.rexUI.add.container(0, 0)
                    const tag = scene.add
                        .image(0, 0, BaseAssetKey.ModalStandTag)
                        .setOrigin(0.5, 0)
                    container.addLocal(tag)
                    // if item is existed
                    if (item) {
                        // create the item card
                        return this.createProductBadgeLabel(item)
                    } else {
                        // no item, create the add button
                        const addButton = this.createAddButton().setOrigin(0.5, 1)
                        container.addLocal(addButton)
                    }
                    return container
                },
            })
            .addBackground(background)
            .layout()
            .setOrigin(0.5, 0.5)
        this.addLocal(this.gridSizer)
    }

    private createAddButton() {
        const image = this.scene.add.image(0, 0, BaseAssetKey.ModalStandAddButton)
        image.setInteractive()
        image.on("pointerdown", () => {
            onGameObjectPress({
                gameObject: image,
                scene: this.scene,
                onPress: () => {
                    // open the select product modal
                    const eventMessage: OpenModalMessage = {
                        modalName: ModalName.SelectProduct,
                    }
                    EventBus.emit(EventName.OpenModal, eventMessage)
                    this.scene.events.emit(EventName.UpdateSelectProductModal)
                },
            })
        })
        return image
    }

    private createProductBadgeLabel(product: DeliveringProductSchema) {
        const label = this.scene.add.text(0, 0, "123")
        return label
    }
}

export interface CreateItemCardParams {
  assetKey: string;
  title: string;
  onPress: () => void;
}
