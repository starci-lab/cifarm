import {
    CropCurrentState,
    PlacedItemEntity,
    PlacedItemType,
} from "@/modules/entities"
import { cropAssetMap } from "../assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"

export class PlacedItemObject extends Phaser.GameObjects.Sprite {
    // list of extra sprites that are part of the placed item
    private container: ContainerLite | undefined
    private seedGrowthInfoSprite: Phaser.GameObjects.Sprite | undefined
    private bubbleState: ContainerLite | undefined
    private currentPlacedItem: PlacedItemEntity | undefined

    public update(type: PlacedItemType, placedItem: PlacedItemEntity) {
        switch (type) {
        case PlacedItemType.Tile: {
            if (!placedItem.seedGrowthInfo) {
                // do nothing
                break
            }
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
            throw new Error("Seed growth info not found")
        }
        // const key = getCropAssetKey({
        //     cropId: placedItem.seedGrowthInfo.cropId,
        //     growthStage: placedItem.seedGrowthInfo.currentStage,
        // })

        // update the texture if current placed item is different from the previous one
        if (
            this.currentPlacedItem?.seedGrowthInfo?.currentStage !==
      placedItem.seedGrowthInfo.currentStage
        ) {
            const key =
        cropAssetMap[placedItem.seedGrowthInfo.cropId].stages?.[
            placedItem.seedGrowthInfo.currentStage
        ].textureConfig.key

            const data = cropAssetMap[placedItem.seedGrowthInfo.cropId]
            if (!data) {
                throw new Error("Crop data not found")
            }
            const offsets =
        data.stages?.[placedItem.seedGrowthInfo.currentStage].tilesetConfig
            ?.extraOffsets
            const { x = 0, y = 0 } = { ...offsets }

            if (!this.seedGrowthInfoSprite) {
                this.seedGrowthInfoSprite = this.scene.add.sprite(x, y, key)
                container.addLocal(this.seedGrowthInfoSprite)
            } else {
                this.seedGrowthInfoSprite.setTexture(key)
            }
        }

        // update the bubble state
        if (
            placedItem.seedGrowthInfo.currentState !== CropCurrentState.Normal &&
      this.currentPlacedItem?.seedGrowthInfo?.currentState !==
        placedItem.seedGrowthInfo.currentState
        ) {
            if (!this.bubbleState) {
                this.bubbleState = this.scene.rexUI.add
                    .container(0, 0)
                    .add(
                        this.scene.add.sprite(0, 0, "bubble-" + placedItem.seedGrowthInfo.currentState)
                    )
                container.add(this.bubbleState)
            } else {
                this.bubbleState.getAt(0).setTexture("bubble-" + placedItem.seedGrowthInfo.currentState)
            }
        }
    }
}
