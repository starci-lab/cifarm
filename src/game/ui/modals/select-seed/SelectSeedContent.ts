import { CacheKey, SizerBaseConstructorParams } from "../../../types"
import { BaseText } from "../../elements"
import { InventoryEntity, InventoryTypeId } from "@/modules/entities"
import { getSeedInventories } from "@/game/queries"
import {
    BadgeLabel,
    GridTable,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseAssetKey, inventoryTypeAssetMap } from "../../../assets"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { getScreenCenterX, getScreenCenterY, onGameObjectPress } from "../../utils"
import {
    EventBus,
    EventName,
    TutorialTilePressedResponsedMessage,
} from "@/game/event-bus"
import { sleep } from "@/modules/common"
import { SCALE_TIME } from "../../../constants"
import { HIGHLIGH_DEPTH } from "../shop"
import { CONTENT_DEPTH } from "./SelectSeedModal"

export class SelectSeedContent extends BaseSizer {
    private gridTable: GridTable | undefined
    private seedInventories: Array<InventoryEntity> = []

    constructor({
        scene,
        x,
        y,
        width,
        height,
        config,
    }: SizerBaseConstructorParams) {
        super(scene, x, y, width, height, config)
        // load the seed inventories
        this.seedInventories = getSeedInventories({
            scene: this.scene,
        })
        this.createGridTable()

        EventBus.on(EventName.TutorialTilePressed, async () => {
            // wait for the modal to be scaled fully
            await sleep(SCALE_TIME)
            // highlight the first cell
            if (!this.firstCell) {
                throw new Error("First cell is not defined")
            }
            this.firstCell.setDepth(HIGHLIGH_DEPTH)

            const eventMessage: TutorialTilePressedResponsedMessage = {
                position: this.firstCell.getCenter(),
            }
            EventBus.emit(EventName.TutorialTilePressedResponsed, eventMessage)
        })

        this.setDirty(false)
    }

    private createGridTable() {
    // grid width and height
        const gridWidth = 700
        const gridHeight = 500

        const cells: Array<CreateItemCellParams> = this.seedInventories.map(
            (inventory) => {
                return {
                    assetKey:
            inventoryTypeAssetMap[inventory.inventoryTypeId as InventoryTypeId]
                .textureConfig.key,
                    quantity: inventory.quantity,
                    onPress: () => {
                        console.log("Clicked")
                    },
                }
            }
        )

        this.gridTable = this.scene.rexUI.add
            .gridTable({
                x: getScreenCenterX(this.scene),
                y: getScreenCenterY(this.scene) + 50,
                width: gridWidth,
                height: gridHeight,
                table: {
                    columns: 3, // Fixed 3 columns
                    cellWidth: 250, // Adjusted to fit 3x width
                    cellHeight: 250, // Adjusted height per row
                    mask: { padding: 2 }, // Enable scrolling
                    interactive: true, // Allow scrolling
                },
                slider: {
                    track: this.scene.add.rectangle(0, 0, 10, gridHeight, 0x888888),
                    thumb: this.scene.add.rectangle(0, 0, 10, 40, 0xffffff),
                },
                mouseWheelScroller: { focus: false, speed: 2 },
                space: { left: 10, right: 10, top: 10, bottom: 10, table: 10 },
                createCellContainerCallback: (cell) => {
                    return this.createItemCell(cells[cell.index])
                },
                items: cells,
            })
            .layout()
            .setOrigin(0.5, 0.5)
        this.add(this.gridTable)
    }

    private firstCell: BadgeLabel | undefined
    // create the item cell
    private createItemCell({
        assetKey,
        quantity,
        onPress,
    }: CreateItemCellParams) {
    // frame
        const frame = this.scene.add.image(0, 0, BaseAssetKey.ModalCommonFrame)
        // icon container
        const iconContainer = this.scene.rexUI.add.container(0, 0)
        const icon = this.scene.add.image(0, 0, assetKey).setOrigin(0.5, 0.5)
        iconContainer.addLocal(icon)

        const quantityFrame = this.scene.add.image(
            0,
            0,
            BaseAssetKey.ModalCommonQuantityFrame
        )
        // quantity container
        const quantityText = new BaseText({
            baseParams: {
                scene: this.scene,
                text: quantity.toString(),
                x: 0,
                y: 0,
            },
            options: {
                fontSize: 32,
            },
        })
        this.scene.add.existing(quantityText)
        const quantityLabel = this.scene.rexUI.add.label({
            width: quantityFrame.width,
            height: quantityFrame.height,
            background: quantityFrame,
            text: quantityText,
            originY: 1,
            originX: 1,
            align: "center",
        })

        const badgeLabel = this.scene.rexUI.add.badgeLabel({
            width: frame.width,
            height: frame.height,
            main: this.scene.rexUI.add.label({
                icon: icon,
            }),
            background: frame,
            rightBottom: quantityLabel,
        })

        if (!this.firstCell) {
            this.firstCell = badgeLabel
        }

        badgeLabel.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: badgeLabel,
                onPress: () => {
                    if (this.firstCell) {
                        if (this.scene.cache.obj.exists(CacheKey.TutorialActive)) {
                            this.firstCell.setDepth(CONTENT_DEPTH)
                        }         
                    }
                    onPress()
                },
                scene: this.scene,
            })
        })

        return badgeLabel
    }
}

export interface CreateItemCellParams {
  // the asset key of the item card
  assetKey: string;
  // quantity of the item
  quantity: number;
  // on click event
  onPress: () => void;
}
