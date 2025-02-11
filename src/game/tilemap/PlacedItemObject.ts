import {
    CropCurrentState,
    PlacedItemEntity,
    PlacedItemType,
} from "@/modules/entities"
import { BaseAssetKey, cropAssetMap } from "../assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { cropStateAssetMap } from "../assets/states"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { TILE_HEIGHT, TILE_WIDTH } from "./constants"
import { BaseText } from "../ui"
import { formatTime } from "@/modules/common"

export class PlacedItemObject extends Phaser.GameObjects.Sprite {
    // list of extra sprites that are part of the placed item
    private container: ContainerLite | undefined
    private seedGrowthInfoSprite: Phaser.GameObjects.Sprite | undefined
    private bubbleState: Label | undefined
    private currentPlacedItem: PlacedItemEntity | undefined
    private timer: Phaser.GameObjects.Text | undefined

    public update(type: PlacedItemType, placedItem: PlacedItemEntity) {
        switch (type) {
        case PlacedItemType.Tile: {
            this.updateSeedGrowthInfo(placedItem)
            break
        }
        default:
            break
        }
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

    private updateSeedGrowthInfo(placedItem: PlacedItemEntity) {
        const container = this.getContainer()
        if (!placedItem.seedGrowthInfo) {
            // remove everything in the container
            container.clear(true)
            return
        }

        // Update the texture
        this.updateSeedGrowthInfoTexture(placedItem, container)

        // Update the bubble state
        this.updateSeedGrowthInfoBubble(placedItem, container)

        // Update the timer
        this.updateSeedGrowthInfoTimer(placedItem, container)
    }   

    private updateSeedGrowthInfoTexture(placedItem: PlacedItemEntity, container: ContainerLite) {
        if (!placedItem.seedGrowthInfo) {
            throw new Error("Seed growth info not found")
        }

        if (
            this.currentPlacedItem?.seedGrowthInfo?.currentStage !==
        placedItem.seedGrowthInfo.currentStage
        ) {
            const key = cropAssetMap[placedItem.seedGrowthInfo.cropId].stages?.[
                placedItem.seedGrowthInfo.currentStage
            ].textureConfig.key
            const data = cropAssetMap[placedItem.seedGrowthInfo.cropId]
            if (!data) {
                throw new Error("Crop data not found")
            }
            const offsets = data.stages?.[placedItem.seedGrowthInfo.currentStage].tilesetConfig
                ?.extraOffsets
            const { x = 0, y = 0 } = { ...offsets }

            if (!this.seedGrowthInfoSprite) {
                this.seedGrowthInfoSprite = this.scene.add.sprite(x, y, key).setDepth(this.depth + 1)
                container.addLocal(this.seedGrowthInfoSprite)
            } else {
                this.seedGrowthInfoSprite.setTexture(key)
            }
        }
    }

    private updateSeedGrowthInfoBubble(placedItem: PlacedItemEntity, container: ContainerLite) {
        if (!placedItem.seedGrowthInfo) {
            throw new Error("Seed growth info not found")
        }
        if (placedItem.seedGrowthInfo.currentState !== CropCurrentState.Normal) {
            if (
                this.currentPlacedItem?.seedGrowthInfo?.currentState !== placedItem.seedGrowthInfo.currentState
            ) {
                if (!this.bubbleState) {
                    const background = this.scene.add.image(0, 0, BaseAssetKey.BubbleState)
                    this.bubbleState = this.scene.rexUI.add.label({
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
                const stateKey = cropStateAssetMap[placedItem.seedGrowthInfo.currentState]?.textureConfig.key
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

    private updateSeedGrowthInfoTimer(placedItem: PlacedItemEntity, container: ContainerLite) {
        if (!placedItem.seedGrowthInfo) {
            throw new Error("Seed growth info not found")
        }
        if (placedItem.seedGrowthInfo.currentState != CropCurrentState.FullyMatured) {
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
                        syncPosition: true
                    })
                }
    
                const formattedTime = formatTime(placedItem.seedGrowthInfo.currentStageTimeElapsed)
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
