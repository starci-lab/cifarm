import {
    CropCurrentState,
    CropSchema,
    PlacedItemSchema,
    PlacedItemType,
} from "@/modules/entities"
import { BaseAssetKey, cropAssetMap } from "../assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { cropStateAssetMap } from "../assets/states"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { TILE_HEIGHT, TILE_WIDTH } from "./constants"
import { BaseText } from "../ui"
import { formatTime } from "@/modules/common"
import { CacheKey } from "../types"

export class PlacedItemObject extends Phaser.GameObjects.Sprite {
    // list of extra sprites that are part of the placed item
    private container: ContainerLite | undefined
    private seedGrowthInfoSprite: Phaser.GameObjects.Sprite | undefined
    private bubbleState: Label | undefined
    public currentPlacedItem: PlacedItemSchema | undefined
    private timer: Phaser.GameObjects.Text | undefined
    private crops: Array<CropSchema> = []

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)

        this.crops = scene.cache.obj.get(CacheKey.Crops)
    }

    public update(type: PlacedItemType, placedItem: PlacedItemSchema) {
        switch (type) {
        case PlacedItemType.Tile: {
            this.updateSeedGrowthInfo(placedItem)
            break
        }
        default:
            break
        }
        // set the placed item
        this.currentPlacedItem = placedItem
    }

    private getContainer() {
        if (!this.container) {
            this.container = this.scene.rexUI.add
                .container(this.x - this.displayWidth / 2, this.y)
                .setScale(this.scale)
                .setDepth(this.depth + 1)
        }
        return this.container
    }

    private updateSeedGrowthInfo(placedItem: PlacedItemSchema) {
        const container = this.getContainer()
        if (!placedItem.seedGrowthInfo) {
            // remove everything in the container
            container.clear(true)
        } else {
            // Update the texture
            this.updateSeedGrowthInfoTexture(placedItem, container)

            // Update the bubble state
            this.updateSeedGrowthInfoBubble(placedItem, container)

            // Update the timer
            this.updateSeedGrowthInfoTimer(placedItem, container)
        }
    }

    public destroyAll() {
        this.container?.clear(true)
        this.container?.destroy()
        this.seedGrowthInfoSprite?.destroy()
        this.bubbleState?.destroy()
        this.timer?.destroy()
        this.destroy()
    }
    private updateSeedGrowthInfoTexture(
        placedItem: PlacedItemSchema,
        container: ContainerLite
    ) {
        if (!placedItem.seedGrowthInfo) {
            throw new Error("Seed growth info not found")
        }

        if (
            this.currentPlacedItem?.seedGrowthInfo?.currentStage !==
      placedItem.seedGrowthInfo.currentStage
        ) {
            const crop = this.crops.find(
                (crop) => crop.id === placedItem?.seedGrowthInfo?.crop
            )
            if (!crop) {
                throw new Error("Crop not found")
            }

            const data = cropAssetMap[crop.displayId]
            if (!data) {
                throw new Error("Crop data not found")
            }
            const assetData = data.stages?.[placedItem.seedGrowthInfo.currentStage]
            if (!assetData) {
                throw new Error("Asset data not found")
            }
            const {
                textureConfig: { key },
                tilesetConfig: { extraOffsets: offsets },
            } = assetData
            const { x = 0, y = 0 } = { ...offsets }

            if (!this.seedGrowthInfoSprite) {
                this.seedGrowthInfoSprite = this.scene.add
                    .sprite(x, y, key)
                    .setDepth(this.depth + 1)
                container.addLocal(this.seedGrowthInfoSprite)
            } else {
                this.seedGrowthInfoSprite.setTexture(key)
            }
        }
    }

    private updateSeedGrowthInfoBubble(
        placedItem: PlacedItemSchema,
        container: ContainerLite
    ) {
        if (!placedItem.seedGrowthInfo) {
            throw new Error("Seed growth info not found")
        }
        if (placedItem.seedGrowthInfo.currentState !== CropCurrentState.Normal) {
            if (
                this.currentPlacedItem?.seedGrowthInfo?.currentState !==
        placedItem.seedGrowthInfo.currentState
            ) {
                if (!this.bubbleState) {
                    const background = this.scene.add.image(
                        0,
                        0,
                        BaseAssetKey.BubbleState
                    )
                    this.bubbleState = this.scene.rexUI.add
                        .label({
                            background,
                            icon: this.scene.add.image(0, 0, ""),
                            width: background.width,
                            height: background.height,
                            align: "center",
                            space: {
                                bottom: 10,
                            },
                        })
                        .setScale(0.5)
                        .setDepth(this.depth + 2)
                        .setPosition(-TILE_WIDTH / 4, -TILE_HEIGHT / 2)
                    container.addLocal(this.bubbleState)
                }

                // update the icon
                const stateKey =
          cropStateAssetMap[placedItem.seedGrowthInfo.currentState]
              ?.textureConfig.key
                if (!stateKey) {
                    throw new Error("State key not found")
                }
                this.bubbleState.setIconTexture(stateKey).layout()
            }
        } else {
            // if bubble state is present, remove it
            if (this.bubbleState) {
                this.bubbleState.destroy()
                this.bubbleState = undefined
            }
        }
    }

    private updateSeedGrowthInfoTimer(
        placedItem: PlacedItemSchema,
        container: ContainerLite
    ) {
        if (!placedItem.seedGrowthInfo) {
            throw new Error("Seed growth info not found")
        }
        if (
            placedItem.seedGrowthInfo.currentState != CropCurrentState.FullyMatured
        ) {
            if (
                placedItem.seedGrowthInfo.currentStageTimeElapsed !==
        this.currentPlacedItem?.seedGrowthInfo?.currentStageTimeElapsed
            ) {
                if (!this.timer) {
                    const text = new BaseText({
                        baseParams: {
                            scene: this.scene,
                            x: 0,
                            y: TILE_HEIGHT / 2 - 10,
                            text: "",
                        },
                        options: {
                            fontSize: 32,
                            enableStroke: true,
                        },
                    })
                    this.scene.add.existing(text)
                    text.setOrigin(0.5, 1).setDepth(this.depth + 3)
                    this.timer = text
                    container.pinLocal(this.timer, {
                        syncScale: false,
                        syncPosition: true,
                    })
                }

                const formattedTime = formatTime(
                    placedItem.seedGrowthInfo.currentStageTimeElapsed
                )
                this.timer.setText(formattedTime)
            }
            this.currentPlacedItem = placedItem
        } else {
            if (this.timer) {
                this.timer.destroy()
                this.timer = undefined
            }
        }
    }
}
