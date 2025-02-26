import {
    AnimalCurrentState,
    AnimalSchema,
    CropCurrentState,
    CropSchema,
    PlacedItemSchema,
    PlacedItemType,
    ProductSchema,
} from "@/modules/entities"
import { AnimalAge, animalAssetMap, BaseAssetKey, cropAssetMap, productAssetMap } from "../assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { animalStateAssetMap, cropStateAssetMap } from "../assets/states"
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { TILE_HEIGHT, TILE_WIDTH } from "./constants"
import { BaseText } from "../ui"
import { formatTime } from "@/modules/common"
import { CacheKey } from "../types"

export class PlacedItemObject extends Phaser.GameObjects.Sprite {
    // list of extra sprites that are part of the placed item
    private container: ContainerLite | undefined
    private seedGrowthInfoSprite: Phaser.GameObjects.Sprite | undefined
    private animalInfoSprite: Phaser.GameObjects.Sprite | undefined
    private bubbleState: Label | undefined
    public currentPlacedItem: PlacedItemSchema | undefined
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
            // this.updateBuildingInfo(placedItem)
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

                let stateKey: string | undefined
                // update the icon
                // for state 0-3, use the icon in the crop asset map
                if (placedItem.seedGrowthInfo.currentState !== CropCurrentState.FullyMatured) {
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
                    stateKey = productAssetMap[product.displayId].textureConfig.key
                }
                if (!stateKey) {
                    throw new Error("State key not found")
                }
                console.log(stateKey)
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
                    Math.round(placedItem.seedGrowthInfo.currentStageTimeElapsed)
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

            const data = animalAssetMap[animal.displayId].ages[placedItem.animalInfo.isAdult ? 
                AnimalAge.Adult : AnimalAge.Baby
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
                if (!stateKey) {
                    throw new Error("State key not found")
                }
                console.log(stateKey)
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

    private updateAnimalInfoTimer(
        placedItem: PlacedItemSchema,
        container: ContainerLite
    ) {
        if (!placedItem.animalInfo) {
            throw new Error("Animal info not found")
        }
        if (
            placedItem.animalInfo.currentState != AnimalCurrentState.Yield
        ) {
            if (
                placedItem.animalInfo.currentGrowthTime !==
        this.currentPlacedItem?.animalInfo?.currentGrowthTime
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
                    Math.round(placedItem.animalInfo.currentGrowthTime)
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
