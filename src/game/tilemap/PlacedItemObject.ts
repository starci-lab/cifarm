import { createObjectId, formatTime } from "@/modules/common"
import {
    AnimalCurrentState,
    AnimalSchema,
    CropCurrentState,
    CropSchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeId,
    ProductSchema,
} from "@/modules/entities"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import {
    AnimalAge,
    animalAssetMap,
    BaseAssetKey,
    cropAssetMap,
    productAssetMap,
} from "../assets"
import { animalStateAssetMap, cropStateAssetMap } from "../assets/states"
import { CacheKey } from "../types"
import { Text, TextColor } from "../ui"
import { TILE_HEIGHT, TILE_WIDTH } from "./constants"

export class PlacedItemObject extends Phaser.GameObjects.Sprite {
    // list of extra sprites that are part of the placed item
    private container: ContainerLite | undefined
    private seedGrowthInfoSprite: Phaser.GameObjects.Sprite | undefined
    private animalInfoSprite: Phaser.GameObjects.Sprite | undefined
    private bubbleState: Label | undefined
    private quantityText: Text | undefined
    public currentPlacedItem: PlacedItemSchema | undefined
    private fertilizerParticle: Phaser.GameObjects.Sprite | undefined
    private levelStar: Phaser.GameObjects.Sprite | undefined
    private timer: Phaser.GameObjects.Text | undefined
    private crops: Array<CropSchema> = []
    private products: Array<ProductSchema> = []
    private animals: Array<AnimalSchema> = []

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)

        this.crops = scene.cache.obj.get(CacheKey.Crops)
        this.products = scene.cache.obj.get(CacheKey.Products)
        this.animals = scene.cache.obj.get(CacheKey.Animals)
    }

    public update(type: PlacedItemType, placedItem: PlacedItemSchema) {
        switch (type) {
        case PlacedItemType.Tile: {
            this.updateSeedGrowthInfo(placedItem)
            break
        }
        case PlacedItemType.Building: {
            this.updateBuildingInfo(placedItem)
            break
        }
        case PlacedItemType.Animal: {
            this.updateAnimalInfo(placedItem)
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
            this.setAllPropsToUndefined()
        } else {
            // Update the texture
            this.updateSeedGrowthInfoTexture(placedItem, container)

            // Update the bubble state
            this.updateSeedGrowthInfoBubble(placedItem, container)

            // Update the timer
            this.updateSeedGrowthInfoTimer(placedItem, container)

            // Update the fertilizer
            this.updateSeedGrowthInfoFertilizer(placedItem, container)
        }
    }

    private updateAnimalInfo(placedItem: PlacedItemSchema) {
        const container = this.getContainer()
        if (!placedItem.animalInfo) {
            // remove everything in the container
            container.clear(true)
            this.setAllPropsToUndefined()
        } else {
            // Update the texture
            this.updateAnimalInfoTexture(placedItem, container)

            // Update the bubble state
            this.updateAnimalInfoBubble(placedItem, container)

            // // Update the timer
            this.updateAnimalInfoTimer(placedItem, container)
        }
    }
    private updateBuildingInfo(placedItem: PlacedItemSchema) {
        const container = this.getContainer()
        if (!placedItem.buildingInfo) {
            // remove everything in the container
            container.clear(true)
            this.setAllPropsToUndefined()
        } else {
            // Update the star based on level
            this.updateBuildingInfoLevel(placedItem, container)
        }
    }

    private updateBuildingInfoLevel(
        placedItem: PlacedItemSchema,
        container: ContainerLite
    ) {
        if (!placedItem.buildingInfo) {
            throw new Error("Building info not found")
        }

        //if home not show star
        if (placedItem.placedItemType === createObjectId(PlacedItemTypeId.Home)) {
            return
        }

        const stars = placedItem.buildingInfo.currentUpgrade || 0
        const starKey = BaseAssetKey.UIModalStandPurpleStar

        // Update the number of stars
        for (let i = 0; i < stars; i++) {
            const star = this.scene.add
                .sprite(i * 40, 0, starKey)
                .setDepth(this.depth + 1)
                .setScale(0.5)
                .setPosition(i * -40, (-TILE_HEIGHT * 2) / 3)
            container.addLocal(star)
        }
    }

    private setAllPropsToUndefined() {
        this.seedGrowthInfoSprite = undefined
        this.animalInfoSprite = undefined
        this.bubbleState = undefined
        this.timer = undefined
    }
    public destroyAll() {
        this.container?.clear(true)
        this.setAllPropsToUndefined()
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
                this.seedGrowthInfoSprite
                    .setTexture(key)
                    .setPosition(x, y)
                    .setDepth(this.depth + 1)
                    .setScale(1)
                container.addLocal(this.seedGrowthInfoSprite)
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
                        .setDepth(this.depth + 10000)
                        .setPosition(-TILE_WIDTH / 4, -TILE_HEIGHT / 2)
                    container.addLocal(this.bubbleState)
                }

                let stateKey: string | undefined
                // update the icon
                // for state 0-3, use the icon in the crop asset map
                if (
                    placedItem.seedGrowthInfo.currentState !==
          CropCurrentState.FullyMatured
                ) {
                    stateKey =
            cropStateAssetMap[placedItem.seedGrowthInfo.currentState]
                ?.textureConfig.key
                } else {
                    // use the product icon
                    const crop = this.crops.find(
                        (crop) => crop.id === placedItem.seedGrowthInfo?.crop
                    )
                    if (!crop) {
                        throw new Error("Crop not found")
                    }
                    const product = this.products.find(
                        (product) => product.crop === crop.id
                    )
                    if (!product) {
                        throw new Error("Product not found")
                    }

                    const text = `${
                        placedItem.seedGrowthInfo.harvestQuantityRemaining || 0
                    }/${crop.maxHarvestQuantity || 0}`

                    this.quantityText = new Text({
                        baseParams: {
                            scene: this.scene,
                            text,
                            x: 0,
                            y: 0,
                        },
                        options: {
                            fontSize: 28,
                            textColor: TextColor.Brown,
                        },
                    }).setDepth(this.depth + 10001)

                    this.scene.add.existing(this.quantityText)
                    this.bubbleState.addLocal(this.quantityText)

                    stateKey = undefined
                }
                if (stateKey) {
                    this.bubbleState.setIconTexture(stateKey).layout()
                } else {
                    this.bubbleState.resetDisplayContent({
                        icon: false,
                    })
                }
            } else if (
                this.currentPlacedItem?.seedGrowthInfo?.harvestQuantityRemaining !==
        undefined &&
      this.currentPlacedItem?.seedGrowthInfo?.harvestQuantityRemaining !==
        placedItem.seedGrowthInfo?.harvestQuantityRemaining
            ) {
                if (!this.quantityText) {
                    throw new Error("Quantity text not found")
                }
                this.quantityText.setText(
                    `${placedItem?.seedGrowthInfo?.harvestQuantityRemaining || 0}/${
                        this.currentPlacedItem?.seedGrowthInfo?.harvestCount || 0
                    }`
                )
            }
        } else {
            // if bubble state is present, remove it
            if (this.bubbleState) {
                this.bubbleState.destroy()
                this.bubbleState = undefined
            }
        }

    }

    private updateSeedGrowthInfoFertilizer(
        placedItem: PlacedItemSchema,
        container: ContainerLite
    ) {
        if (!placedItem.seedGrowthInfo) {
            throw new Error("Seed growth info not found")
        }

        if (placedItem.seedGrowthInfo.isFertilized) {
            // Create fertilizer sprite if it doesn’t exist
            if (!this.fertilizerParticle) {
                this.fertilizerParticle = this.scene.add
                    .sprite(0, 0, BaseAssetKey.FertilizerParticle) // Using sprite instead of image
                    .setDepth(this.depth)
                    .setScale(0.7)
                    .setPosition(0, 0)

                container.addLocal(this.fertilizerParticle)
            }
        } else {
            // Remove fertilizer sprite if fertilizer effect is gone
            if (this.fertilizerParticle) {
                this.fertilizerParticle.destroy()
                this.fertilizerParticle = undefined
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
                    const text = new Text({
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

                const crop = this.crops.find(
                    (crop) => crop.id === placedItem.seedGrowthInfo?.crop
                )

                if (crop?.growthStageDuration == undefined) {
                    throw new Error("Crop growth stage duration not found")
                }

                const formattedTime = formatTime(
                    Math.round(
                        crop.growthStageDuration -
              placedItem.seedGrowthInfo.currentStageTimeElapsed
                    )
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

    private updateAnimalInfoTexture(
        placedItem: PlacedItemSchema,
        container: ContainerLite
    ) {
        if (!placedItem.animalInfo) {
            throw new Error("Animal info not found")
        }

        if (
            this.currentPlacedItem?.animalInfo?.currentState !==
      placedItem.animalInfo.currentState
        ) {
            const animal = this.animals.find(
                (animal) => animal.id === placedItem?.animalInfo?.animal
            )
            if (!animal) {
                throw new Error("Animal not found")
            }

            const data =
        animalAssetMap[animal.displayId].ages[
            placedItem.animalInfo.isAdult ? AnimalAge.Adult : AnimalAge.Baby
        ]
            if (!data) {
                throw new Error("Animal data not found")
            }
            const {
                textureConfig: { key },
                tilesetConfig: { extraOffsets: offsets },
            } = data
            const { x = 0, y = 0 } = { ...offsets }

            if (!this.animalInfoSprite) {
                this.animalInfoSprite = this.scene.add
                    .sprite(x, y, key)
                    .setDepth(this.depth + 1)
                container.addLocal(this.animalInfoSprite)
            } else {
                this.animalInfoSprite.setTexture(key)
            }
        }
    }

    private updateAnimalInfoBubble(
        placedItem: PlacedItemSchema,
        container: ContainerLite
    ) {
        if (!placedItem.animalInfo) {
            throw new Error("Animal info not found")
        }
        if (placedItem.animalInfo.currentState !== AnimalCurrentState.Normal) {
            if (
                this.currentPlacedItem?.animalInfo?.currentState !==
        placedItem.animalInfo.currentState
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

                let stateKey: string | undefined
                // update the icon
                // for state 0-3, use the icon in the crop asset map
                if (placedItem.animalInfo.currentState !== AnimalCurrentState.Yield) {
                    stateKey =
            animalStateAssetMap[placedItem.animalInfo.currentState]
                ?.textureConfig.key
                } else {
                    // use the product icon
                    const animal = this.animals.find(
                        (animal) => animal.id === placedItem.animalInfo?.animal
                    )
                    if (!animal) {
                        throw new Error("Animal not found")
                    }
                    const product = this.products.find(
                        (product) => product.animal === animal.id
                    )
                    if (!product) {
                        throw new Error("Product not found")
                    }
                    stateKey = productAssetMap[product.displayId].textureConfig.key
                }
                if (stateKey) {
                    this.bubbleState.setIconTexture(stateKey).layout()
                } else {
                    this.bubbleState.resetDisplayContent({
                        icon: false,
                    })
                }
            }
        } else {
            // if bubble state is present, remove it
            if (this.bubbleState) {
                this.bubbleState.destroy()
                this.bubbleState = undefined
            }
        }
    }

    private updateAnimalInfoTimer(
        placedItem: PlacedItemSchema,
        container: ContainerLite
    ) {
        if (!placedItem.animalInfo) {
            throw new Error("Animal info not found")
        }

        if (placedItem.animalInfo.currentState != AnimalCurrentState.Yield) {
            if (
                placedItem.animalInfo.currentGrowthTime !==
        this.currentPlacedItem?.animalInfo?.currentGrowthTime
            ) {
                if (!this.timer) {
                    const text = new Text({
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

                const animal = this.animals.find(
                    (animal) => animal.id === placedItem.animalInfo?.animal
                )

                if (animal?.growthTime == undefined) {
                    throw new Error("Animal growth time not found")
                }

                const formattedTime = formatTime(
                    Math.round(
                        animal.growthTime - placedItem.animalInfo.currentGrowthTime
                    )
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
