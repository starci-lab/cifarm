import { PlacedItemEntity, PlacedItemType } from "@/modules/entities"
import { cropAssetMap } from "../assets"

export class PlacedItemObject extends Phaser.GameObjects.Sprite {
    // list of extra sprites that are part of the placed item
    private container: Phaser.GameObjects.Container | undefined
    private seedGrowthInfoSprite: Phaser.GameObjects.Sprite | undefined
    
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
            this.container = this.scene.add
                .container(this.x - this.displayWidth / 2, this.y)
                .setScale(this.scale)
                .setDepth(this.depth + 1)
            this.scene.add.existing(this.container)
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
        const key =
      cropAssetMap[placedItem.seedGrowthInfo.cropId].stages?.[
          placedItem.seedGrowthInfo.currentStage
      ].textureConfig.key
        console.log(key)
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
            container.add(this.seedGrowthInfoSprite)
        } else {
            this.seedGrowthInfoSprite.setTexture(key)
        }
    }
}
