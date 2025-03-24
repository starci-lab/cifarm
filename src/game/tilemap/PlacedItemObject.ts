import { createObjectId, formatTime } from "@/modules/common"
import {
    AnimalCurrentState,
    AnimalSchema,
    BuildingSchema,
    CropSchema,
    FlowerSchema,
    FruitCurrentState,
    FruitInfo,
    FruitSchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeId,
    PlacedItemTypeSchema,
    PlantCurrentState,
    PlantType,
    ProductSchema,
    TileSchema,
} from "@/modules/entities"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import {
    OverlapSizer,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import {
    AnimalAge,
    animalAssetMap,
    BaseAssetKey,
    buildingAssetMap,
    cropAssetMap,
    fruitAssetMap,
    TextureConfig,
    tileAssetMap,
} from "../assets"
import {
    animalStateAssetMap,
    fruitStateAssetMap,
    plantStateAssetMap,
} from "../assets/states"
import { CacheKey } from "../types"
import { Text, TextColor } from "../ui"
import { TILE_HEIGHT, TILE_WIDTH } from "./constants"
import { SpineGameObject } from "@esotericsoftware/spine-phaser"
import { calculateGameplayDepth, GameplayLayer } from "../layers"
import { EventName } from "../event-bus"
import { EventBus } from "../event-bus"
import { flowerAssetMap } from "../assets"

export class PlacedItemObject extends ContainerLite {
    private plantInfoSprite: Phaser.GameObjects.Sprite | undefined
    private mainVisual: Phaser.GameObjects.Sprite | SpineGameObject | undefined
    private bubbleState: OverlapSizer | undefined
    private quantityText: Text | undefined
    public currentPlacedItem: PlacedItemSchema | undefined
    private nextPlacedItem: PlacedItemSchema | undefined
    private fertilizerParticle: Phaser.GameObjects.Sprite | undefined
    private starsSizer: Sizer | undefined
    private timer: Phaser.GameObjects.Text | undefined
    private crops: Array<CropSchema>
    private products: Array<ProductSchema>
    private animals: Array<AnimalSchema>
    private placedItemTypes: Array<PlacedItemTypeSchema>
    private tiles: Array<TileSchema>
    private buildings: Array<BuildingSchema>
    private fruits: Array<FruitSchema>
    private flowers: Array<FlowerSchema>
    private fruitInfo: FruitInfo
    private timerIsShown = false

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.crops = scene.cache.obj.get(CacheKey.Crops)
        this.products = scene.cache.obj.get(CacheKey.Products)
        this.animals = scene.cache.obj.get(CacheKey.Animals)
        this.placedItemTypes = scene.cache.obj.get(CacheKey.PlacedItemTypes)
        this.tiles = scene.cache.obj.get(CacheKey.Tiles)
        this.buildings = scene.cache.obj.get(CacheKey.Buildings)
        this.fruits = scene.cache.obj.get(CacheKey.Fruits)
        this.fruitInfo = scene.cache.obj.get(CacheKey.FruitInfo)
        this.flowers = scene.cache.obj.get(CacheKey.Flowers)
    }

    public showTimer() {
        if (!this.timer) {
            return
        }
        if (this.timerIsShown) {
            return
        }
        this.timerIsShown = true
        EventBus.emit(EventName.SyncPlacedItems, {
            placedItemIds: [this.currentPlacedItem?.id],
        })
        this.timer.setVisible(true)
        //delay call for 2s
        this.scene.time.delayedCall(2000, () => {
            if (this.timer) {
                this.timer.setVisible(false)
            }
            this.timerIsShown = false
        })
    }

    public updateContent(placedItem: PlacedItemSchema) {
        this.nextPlacedItem = placedItem
        const placedItemType = this.placedItemTypes.find(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
        if (!placedItemType) {
            throw new Error("Placed item type not found")
        }
        if (!placedItem) {
            throw new Error("Placed item not found")
        }

        this.updateMainVisual()
        switch (placedItemType.type) {
        case PlacedItemType.Tile: {
            this.updatePlantInfo()
            break
        }
        case PlacedItemType.Building: {
            this.updateBuildingInfo()
            break
        }
        case PlacedItemType.Animal: {
            this.updateAnimalInfo()
            break
        }
        case PlacedItemType.Fruit: {
            this.updateFruitInfo()
            break
        }
        default:
            break
        }
        // set the placed item
        this.currentPlacedItem = placedItem
    }

    public setTexture() {
    // do nothing
    }

    private updatePlantInfo() {
        if (!this.nextPlacedItem) {
            throw new Error("Placed item not found")
        }
        if (!this) {
            throw new Error("Container not found")
        }
        if (!this.nextPlacedItem.plantInfo) {
            // remove everything in the container
            this.destroyAll(true)
        } else {
            // Update the texture
            this.updatePlantInfoTexture()

            // Update the bubble state
            this.updatePlantInfoBubble()

            // Update the timer
            this.updatePlantInfoTimer()

            // Update the fertilizer
            this.updatePlantInfoFertilizer()
        }
    }

    private updateAnimalInfo() {
        if (!this.nextPlacedItem?.animalInfo) {
            throw new Error("Animal info not found")
        }
        if (!this.nextPlacedItem?.animalInfo) {
            // remove everything in the container
            this.clear(true)
        } else {
            // Update the bubble state
            this.updateAnimalInfoBubble()

            // // Update the timer
            this.updateAnimalInfoTimer()
        }
    }
    private updateBuildingInfo() {
        if (!this.nextPlacedItem) {
            throw new Error("Placed item not found")
        }
        if (!this) {
            throw new Error("Container not found")
        }
        if (!this.nextPlacedItem.buildingInfo) {
            // remove everything in the container
            this.destroyAll()
        } else {
            // Update the star based on level
            this.updateBuildingUpgrade()
        }
    }

    private updateFruitInfo() {
        if (!this.nextPlacedItem) {
            throw new Error("Placed item not found")
        }
        if (!this.nextPlacedItem.fruitInfo) {
            // remove everything in the container
            this.clear(true)
        } else {
            // Update the bubble state
            this.updateFruitInfoBubble()

            // Update the timer
            this.updateFruitInfoTimer()
        }
    }

    private updateFruitInfoBubble() {
        if (!this) {
            throw new Error("Container not found")
        }
        if (!this.nextPlacedItem?.fruitInfo) {
            throw new Error("Fruit info not found")
        }
        if (
            this.nextPlacedItem.fruitInfo.currentState !== FruitCurrentState.Normal
        ) {
            // use the product icon
            const fruit = this.fruits.find((fruit) => {
                const placedItemType = this.placedItemTypes.find(
                    (placedItemType) =>
                        placedItemType.id === this.nextPlacedItem?.placedItemType
                )
                if (!placedItemType) {
                    throw new Error("Placed item type not found")
                }
                return fruit.id === placedItemType.fruit
            })
            if (!fruit) {
                throw new Error("Fruit not found")
            }
            const product = this.products.find(
                (product) => product.fruit === fruit.id
            )
            if (!product) {
                throw new Error("Product not found")
            }

            // if the current state is different from the previous state
            if (
                this.currentPlacedItem?.fruitInfo?.currentState !==
        this.nextPlacedItem.fruitInfo.currentState
            ) {
                if (!this.bubbleState) {
                    const background = this.scene.add.image(
                        0,
                        0,
                        BaseAssetKey.BubbleState
                    )
                    this.bubbleState = this.scene.rexUI.add
                        .overlapSizer({
                            width: background.width,
                            height: background.height,
                            originY: 1,
                        })
                        .addBackground(background)
                        .setScale(0.5)
                        .setDepth(this.depth + 30)
                        .setPosition(-TILE_WIDTH / 4, -2 * TILE_HEIGHT)
                    this.addLocal(this.bubbleState)
                } else {
                    this.bubbleState.removeAll(true)
                }
                // update the icon
                // for state 0-3, use the icon in the fruit asset map
                if (
                    this.nextPlacedItem.fruitInfo.currentState !==
          FruitCurrentState.FullyMatured
                ) {
                    const textureConfig =
            fruitStateAssetMap[this.nextPlacedItem.fruitInfo.currentState]
                ?.textureConfig
                    if (!textureConfig) {
                        throw new Error("Texture config not found")
                    }
                    const { key, scaleHeight, scaleWidth } = textureConfig
                    if (!key) {
                        throw new Error("State key not found")
                    }
                    const icon = this.scene.add
                        .image(0, 0, key)
                        .setScale(scaleWidth, scaleHeight)
                        .setDepth(this.depth + 31)
                    if (this.bubbleState) {
                        this.bubbleState
                            .add(icon, {
                                align: "center",
                                expand: false,
                                offsetY: -10,
                            })
                            .layout()
                    }
                } else {
                    const text = `${
                        this.nextPlacedItem.fruitInfo.harvestQuantityRemaining || 0
                    }/${fruit.maxHarvestQuantity || 0}`

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
                    }).setDepth(this.depth + 31)

                    this.scene.add.existing(this.quantityText)
                    this.bubbleState
                        .add(this.quantityText, {
                            align: "center",
                            expand: false,
                            offsetY: -10,
                        })
                        .layout()
                }
            } else if (
            // for fully matured state, update the quantity text if the fruit is thiefed
                this.currentPlacedItem?.fruitInfo?.currentState ===
          FruitCurrentState.FullyMatured &&
        this.currentPlacedItem?.fruitInfo?.harvestQuantityRemaining !==
          this.nextPlacedItem.fruitInfo.harvestQuantityRemaining
            ) {
                if (!this.quantityText) {
                    throw new Error("Quantity text not found")
                }
                this.quantityText
                    .setText(
                        `${this.nextPlacedItem.fruitInfo?.harvestQuantityRemaining || 0}/${
                            fruit.maxHarvestQuantity || 0
                        }`
                    )
                    .setDepth(this.depth + 31)
            }
        } else {
            // if bubble state is present, remove it
            if (this.bubbleState) {
                this.bubbleState.removeAll(true)
                this.bubbleState.destroy()
                this.bubbleState = undefined
            }
        }
    }

    private updateFruitInfoTimer() {
        if (!this) {
            throw new Error("Container not found")
        }
        if (!this.nextPlacedItem?.fruitInfo) {
            throw new Error("Fruit info not found")
        }
        if (
            this.nextPlacedItem.fruitInfo.currentState !=
      FruitCurrentState.FullyMatured
        ) {
            if (!this.timer) {
                this.timer = new Text({
                    baseParams: {
                        scene: this.scene,
                        x: 0,
                        y: -50,
                        text: "",
                    },
                    options: {
                        fontSize: 32,
                        enableStroke: true,
                    },
                })
                    .setVisible(false)
                    .setOrigin(0.5, 1)
                    .setDepth(
                        calculateGameplayDepth({
                            layer: GameplayLayer.Effects,
                        })
                    )
                this.scene.add.existing(this.timer)
                this.pinLocal(this.timer, {
                    syncScale: false,
                })
            }
            const fruit = this.fruits.find((fruit) => {
                if (!this.nextPlacedItem) {
                    throw new Error("Current placed item not found")
                }
                const placedItemType = this.placedItemTypes.find(
                    (placedItemType) =>
                        placedItemType.id === this.nextPlacedItem?.placedItemType
                )
                if (!placedItemType) {
                    throw new Error("Placed item type not found")
                }
                return fruit.id === placedItemType.fruit
            })
            if (fruit?.youngGrowthStageDuration === undefined) {
                throw new Error("Fruit young growth stage duration not found")
            }
            if (fruit?.matureGrowthStageDuration === undefined) {
                throw new Error("Fruit mature growth stage duration not found")
            }
            const isMature =
        this.nextPlacedItem.fruitInfo.currentStage >=
        this.fruitInfo.matureGrowthStage - 1
            const growthStageDuration = isMature
                ? fruit.matureGrowthStageDuration
                : fruit.youngGrowthStageDuration

            const formattedTime = formatTime(
                Math.round(
                    growthStageDuration -
            this.nextPlacedItem.fruitInfo.currentStageTimeElapsed
                )
            )
            this.timer.setText(formattedTime)
        } else {
            if (this.timer) {
                this.remove(this.timer, true)
                this.timer = undefined
            }
        }
    }

    private updateBuildingUpgrade() {
        if (!this.nextPlacedItem) {
            throw new Error("Placed item not found")
        }
        if (!this.nextPlacedItem?.buildingInfo) {
            throw new Error("Building info not found")
        }

        //if home not show star
        if (
            this.nextPlacedItem.placedItemType ===
      createObjectId(PlacedItemTypeId.Home)
        ) {
            return
        }

        const stars = this.nextPlacedItem.buildingInfo.currentUpgrade || 0
        const starKey = BaseAssetKey.UIModalStandPurpleStar

        const placedItemTypes = this.placedItemTypes.find(
            (placedItemType) =>
                placedItemType.id === this.nextPlacedItem?.placedItemType
        )
        if (!placedItemTypes) {
            throw new Error("Placed item type not found")
        }
        const building = this.buildings.find(
            (building) => building.id === placedItemTypes.building
        )
        if (!building) {
            throw new Error("Building not found")
        }
        const { x = 0, y = 0 } = {
            ...buildingAssetMap[building.displayId].map.starsConfig?.extraOffsets,
        }
        // Update the number of stars
        // Sizer
        if (this.starsSizer) {
            //destroy the previous stars
            this.starsSizer.removeAll(true)
            this.remove(this.starsSizer, true)
        }
        this.starsSizer = this.scene.rexUI.add.sizer({
            orientation: "x",
            space: {
                item: 20,
            },
        })
        for (let i = 0; i < stars; i++) {
            const star = this.scene.add.sprite(0, 0, starKey)
            this.starsSizer.add(star)
        }
        this.starsSizer
            .layout()
            .setPosition(x, y)
            .setDepth(this.depth + 10)
        this.addLocal(this.starsSizer)
    }

    public destroyAll(exceptMainVisual = false) {
        if (!exceptMainVisual) {
            if (!this.mainVisual) {
                throw new Error("Main visual not found")
            }
            this.remove(this.mainVisual, true)
            this.mainVisual = undefined
        }
        if (this.plantInfoSprite) {
            this.remove(this.plantInfoSprite, true)
            this.plantInfoSprite = undefined
        }
        if (this.bubbleState) {
            this.bubbleState.removeAll(true)
            this.remove(this.bubbleState, true)
            this.bubbleState = undefined
        }
        if (this.timer) {
            this.remove(this.timer, true)
            this.timer = undefined
        }
        if (this.fertilizerParticle) {
            this.remove(this.fertilizerParticle, true)
            this.fertilizerParticle = undefined
        }

        if (this.starsSizer) {
            this.starsSizer.removeAll(true)
            this.remove(this.starsSizer, true)
            this.starsSizer = undefined
        }
    }

    private updatePlantInfoTexture() {
        if (!this.nextPlacedItem) {
            throw new Error("Placed item not found")
        }
        if (!this.nextPlacedItem.plantInfo) {
            throw new Error("Plant info info not found")
        }
        if (
            this.currentPlacedItem?.plantInfo?.currentStage !==
      this.nextPlacedItem.plantInfo.currentStage
        ) {
            let assetData: TextureConfig | undefined
            switch (this.nextPlacedItem.plantInfo.plantType) {
            case PlantType.Crop: {
                const crop = this.crops.find((crop) => {
                    if (!this.nextPlacedItem?.plantInfo) {
                        throw new Error("Placed item not found")
                    }
                    return crop.id === this.nextPlacedItem.plantInfo.crop
                })
                if (!crop) {
                    throw new Error("Crop not found")
                }
                assetData =
            cropAssetMap[crop.displayId].map?.[
                this.nextPlacedItem.plantInfo.currentStage
            ].textureConfig
                break
            }
            case PlantType.Flower: {
                const flower = this.flowers.find(
                    (flower) => flower.id === this.nextPlacedItem?.plantInfo?.flower
                )
                if (!flower) {
                    throw new Error("Flower not found")
                }
                assetData =
            flowerAssetMap[flower.displayId].map?.[
                this.nextPlacedItem.plantInfo.currentStage
            ].textureConfig
                break
            }

            default:
                break
            }
            if (!assetData) {
                throw new Error("Asset data not found")
            }
            const { key, extraOffsets } = assetData
            const { x = 0, y = 0 } = { ...extraOffsets }
            if (this.plantInfoSprite) {
                // destroy the previous sprite
                this.remove(this.plantInfoSprite, true)
            }
            this.plantInfoSprite = this.scene.add
                .sprite(x, y, key)
                .setOrigin(0.5, 1)
                .setDepth(this.depth + 20)
            this.addLocal(this.plantInfoSprite)
        }
    }

    private updatePlantInfoBubble() {
        if (!this) {
            throw new Error("Container not found")
        }
        if (!this.nextPlacedItem?.plantInfo) {
            throw new Error("Plant info not found")
        }
        if (
            this.nextPlacedItem.plantInfo.currentState !== PlantCurrentState.Normal
        ) {
            let maxHarvestQuantity = 0
            switch (this.nextPlacedItem.plantInfo.plantType) {
            case PlantType.Crop: {
                const crop = this.crops.find((crop) => {
                    if (!this.nextPlacedItem) {
                        throw new Error("Current placed item not found")
                    }
                    return crop.id === this.nextPlacedItem.plantInfo?.crop
                })
                if (!crop) {
                    throw new Error("Crop not found")
                }
                maxHarvestQuantity = crop.maxHarvestQuantity
                break
            }
            case PlantType.Flower: {
                const flower = this.flowers.find((flower) => {
                    if (!this.nextPlacedItem) {
                        throw new Error("Current placed item not found")
                    }
                    return flower.id === this.nextPlacedItem.plantInfo?.flower
                })
                if (!flower) {
                    throw new Error("Flower not found")
                }
                maxHarvestQuantity = flower.maxHarvestQuantity
                break
            }
            }
            // if the current state is different from the previous state
            if (
                this.currentPlacedItem?.plantInfo?.currentState !==
        this.nextPlacedItem.plantInfo.currentState
            ) {
                if (!this.bubbleState) {
                    const background = this.scene.add.image(
                        0,
                        0,
                        BaseAssetKey.BubbleState
                    )
                    this.bubbleState = this.scene.rexUI.add
                        .overlapSizer({
                            width: background.width,
                            height: background.height,
                            originY: 1,
                        })
                        .addBackground(background)
                        .setScale(0.5)
                        .setDepth(this.depth + 30)
                        .setPosition(-TILE_WIDTH / 4, (-3 * TILE_HEIGHT) / 4)
                    this.addLocal(this.bubbleState)
                } else {
                    this.bubbleState.removeAll(true)
                }
                // update the icon
                // for state 0-3, use the icon in the crop asset map
                if (
                    this.nextPlacedItem.plantInfo.currentState !==
          PlantCurrentState.FullyMatured
                ) {
                    const stateKey =
            plantStateAssetMap[this.nextPlacedItem.plantInfo.currentState]
                ?.textureConfig.key
                    if (!stateKey) {
                        throw new Error("State key not found")
                    }
                    const icon = this.scene.add
                        .image(0, 0, stateKey)
                        .setDepth(this.depth + 31)
                    if (this.bubbleState) {
                        this.bubbleState
                            .add(icon, {
                                align: "center",
                                expand: false,
                                offsetY: -10,
                            })
                            .layout()
                    }
                } else {
                    const text = `${
                        this.nextPlacedItem.plantInfo.harvestQuantityRemaining || 0
                    }/${maxHarvestQuantity || 0}`

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
                    }).setDepth(this.depth + 31)

                    this.scene.add.existing(this.quantityText)
                    this.bubbleState
                        .add(this.quantityText, {
                            align: "center",
                            expand: false,
                            offsetY: -10,
                        })
                        .layout()
                }
            } else if (
            // for fully matured state, update the quantity text if the crop is thiefed
                this.currentPlacedItem?.plantInfo?.currentState ===
          PlantCurrentState.FullyMatured &&
        this.currentPlacedItem?.plantInfo?.harvestQuantityRemaining !==
          this.nextPlacedItem.plantInfo.harvestQuantityRemaining
            ) {
                console.log(this.nextPlacedItem.plantInfo.harvestQuantityRemaining)
                if (!this.quantityText) {
                    throw new Error("Quantity text not found")
                }
                this.quantityText.setText(
                    `${this.nextPlacedItem.plantInfo?.harvestQuantityRemaining || 0}/${
                        maxHarvestQuantity || 0
                    }`
                )
            }
        } else {
            // if bubble state is present, remove it
            if (this.bubbleState) {
                this.bubbleState.removeAll(true)
                this.bubbleState.destroy()
                this.bubbleState = undefined
            }
        }
    }

    private updatePlantInfoFertilizer() {
        if (!this) {
            throw new Error("Container not found")
        }
        if (!this.nextPlacedItem?.plantInfo) {
            throw new Error("Seed growth info not found")
        }
        if (this.nextPlacedItem.plantInfo.isFertilized) {
            // Create fertilizer sprite if it doesn’t exist
            if (!this.fertilizerParticle) {
                this.fertilizerParticle = this.scene.add
                    .sprite(0, 0, BaseAssetKey.FertilizerParticle) // Using sprite instead of image
                    .setDepth(this.depth + 11)
                    .setOrigin(0.5, 1)
                this.addLocal(this.fertilizerParticle)
            }
        } else {
            // Remove fertilizer sprite if fertilizer effect is gone
            if (this.fertilizerParticle) {
                this.fertilizerParticle.destroy()
                this.fertilizerParticle = undefined
            }
        }
    }

    private updatePlantInfoTimer() {
        if (!this) {
            throw new Error("Container not found")
        }
        if (!this.nextPlacedItem?.plantInfo) {
            throw new Error("Plant info not found")
        }
        if (
            this.nextPlacedItem.plantInfo.currentState !=
      PlantCurrentState.FullyMatured
        ) {
            if (!this.timer) {
                this.timer = new Text({
                    baseParams: {
                        scene: this.scene,
                        x: 0,
                        y: -25,
                        text: "",
                    },
                    options: {
                        fontSize: 32,
                        enableStroke: true,
                    },
                })
                    .setVisible(false)
                    .setOrigin(0.5, 1)
                    .setDepth(
                        calculateGameplayDepth({
                            layer: GameplayLayer.Effects,
                        })
                    )
                this.scene.add.existing(this.timer)
                this.pinLocal(this.timer, {
                    syncScale: false,
                })
            }
            let growthStageDuration = 0
            let currentStageTimeElapsed = 0

            switch (this.nextPlacedItem.plantInfo.plantType) {
            case PlantType.Crop: {
                const crop = this.crops.find((crop) => {
                    if (!this.nextPlacedItem) {
                        throw new Error("Current placed item not found")
                    }
                    return crop.id === this.nextPlacedItem.plantInfo?.crop
                })
                if (!crop) {
                    throw new Error("Crop not found")
                }
                growthStageDuration = crop.growthStageDuration
                currentStageTimeElapsed =
            this.nextPlacedItem.plantInfo.currentStageTimeElapsed
                break
            }
            case PlantType.Flower: {
                const flower = this.flowers.find((flower) => {
                    if (!this.nextPlacedItem) {
                        throw new Error("Current placed item not found")
                    }
                    return flower.id === this.nextPlacedItem.plantInfo?.flower
                })
                if (!flower) {
                    throw new Error("Flower not found")
                }
                growthStageDuration = flower.growthStageDuration
                currentStageTimeElapsed =
            this.nextPlacedItem.plantInfo.currentStageTimeElapsed
                break
            }
            }

            const formattedTime = formatTime(
                Math.round(
                    //         crop.growthStageDuration -
                    //   this.nextPlacedItem.plantInfo.currentStageTimeElapsed
                    growthStageDuration - currentStageTimeElapsed
                )
            )
            this.timer.setText(formattedTime)
        } else {
            if (this.timer) {
                this.remove(this.timer, true)
                this.timer = undefined
            }
        }
    }

    private updateMainVisual() {
        if (!this) {
            throw new Error("Container not found")
        }
        if (!this.nextPlacedItem) {
            throw new Error("Placed item not found")
        }
        const placedItemType = this.placedItemTypes.find((placedItemType) => {
            if (!this.nextPlacedItem) {
                throw new Error("Current placed item not found")
            }
            return placedItemType.id === this.nextPlacedItem.placedItemType
        })
        if (!placedItemType) {
            throw new Error("Placed item type not found")
        }
        // if the placed item type is the same as the current placed item, we will check it either is tree or animal
        let willReturn = false
        if (
            this.nextPlacedItem.placedItemType ===
      this.currentPlacedItem?.placedItemType
        ) {
            switch (placedItemType.type) {
            case PlacedItemType.Animal: {
                // check if the isAdult property has changed
                if (
                    this.currentPlacedItem?.animalInfo?.isAdult ===
            this.nextPlacedItem.animalInfo?.isAdult
                ) {
                    willReturn = true
                }
                break
            }
            case PlacedItemType.Fruit: {
                if (
                    this.currentPlacedItem.fruitInfo?.currentStage ===
            this.nextPlacedItem.fruitInfo?.currentStage
                ) {
                    willReturn = true
                }
                break
            }
            default: {
                willReturn = true
            }
            }
        }
        if (willReturn) {
            return
        }
        const assetData = this.getAssetData()
        if (!assetData) {
            throw new Error("Asset data not found")
        }
        const {
            textureConfig: { key, spineConfig, extraOffsets },
        } = assetData

        const { x = 0, y = 0 } = { ...extraOffsets }
        if (spineConfig) {
            //render spine animation
            if (this.mainVisual) {
                this.remove(this.mainVisual, true)
            }
            this.mainVisual = this.scene.add
                .spine(x, y, spineConfig.json.key, spineConfig.atlas.key)
                .setDepth(this.depth + 10)
                .setOrigin(0.5, 1)
            this.mainVisual.animationState.setAnimation(0, "idle", true)
            this.addLocal(this.mainVisual)
        } else {
            //render sprite
            if (this.mainVisual) {
                // destroy the previous sprite
                this.remove(this.mainVisual, true)
            }
            this.mainVisual = this.scene.add
                .sprite(x, y, key)
                .setDepth(this.depth + 10)
                .setOrigin(0.5, 1)
            this.addLocal(this.mainVisual)
        }
    }

    private updateAnimalInfoBubble() {
        if (!this) {
            throw new Error("Container not found")
        }
        if (!this.nextPlacedItem?.animalInfo) {
            throw new Error("Animal info not found")
        }

        if (
            this.nextPlacedItem.animalInfo.currentState !== AnimalCurrentState.Normal
        ) {
            const animal = this.animals.find((animal) => {
                const placedItemType = this.placedItemTypes.find((placedItemType) => {
                    if (!this.nextPlacedItem) {
                        throw new Error("Current placed item not found")
                    }
                    return placedItemType.id === this.nextPlacedItem.placedItemType
                })
                if (!placedItemType) {
                    throw new Error("Placed item type not found")
                }
                return animal.id === placedItemType.animal
            })

            if (!animal) {
                throw new Error("Animal not found")
            }

            if (
                this.currentPlacedItem?.animalInfo?.currentState !==
        this.nextPlacedItem.animalInfo.currentState
            ) {
                if (!this.bubbleState) {
                    const background = this.scene.add.image(
                        0,
                        0,
                        BaseAssetKey.BubbleState
                    )
                    this.bubbleState = this.scene.rexUI.add
                        .overlapSizer({
                            width: background.width,
                            height: background.height,
                            originY: 1,
                        })
                        .addBackground(background)
                        .setScale(0.5)
                        .setDepth(this.depth + 30)
                        .setPosition(-TILE_WIDTH / 4, (-3 * TILE_HEIGHT) / 4)
                    this.addLocal(this.bubbleState)
                } else {
                    this.bubbleState.removeAll(true)
                }

                if (
                    this.nextPlacedItem.animalInfo.currentState !==
          AnimalCurrentState.Yield
                ) {
                    const textureConfig =
            animalStateAssetMap[this.nextPlacedItem.animalInfo.currentState]
                ?.textureConfig
                    console.log(this.nextPlacedItem.animalInfo.currentState)
                    console.log(textureConfig)
                    if (!textureConfig) {
                        throw new Error("Texture config not found")
                    }
                    const { scaleHeight, scaleWidth, key } = textureConfig
                    if (!key) {
                        throw new Error("State key not found")
                    }
                    const icon = this.scene.add
                        .image(0, 0, key)
                        .setScale(scaleWidth, scaleHeight)
                        .setDepth(this.depth + 31)
                    if (this.bubbleState) {
                        this.bubbleState
                            .add(icon, {
                                align: "center",
                                expand: false,
                                offsetY: -10,
                            })
                            .layout()
                    }
                } else {
                    const text = `${
                        this.nextPlacedItem.animalInfo.harvestQuantityRemaining || 0
                    }/${animal.maxHarvestQuantity || 0}`

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
                    }).setDepth(this.depth + 31)

                    this.scene.add.existing(this.quantityText)
                    this.bubbleState
                        .add(this.quantityText, {
                            align: "center",
                            expand: false,
                            offsetY: -10,
                        })
                        .layout()
                }
            } else if (
                this.currentPlacedItem?.animalInfo?.currentState ===
          AnimalCurrentState.Yield &&
        this.currentPlacedItem?.animalInfo?.harvestQuantityRemaining !==
          this.nextPlacedItem.animalInfo.harvestQuantityRemaining
            ) {
                if (!this.quantityText) {
                    throw new Error("Quantity text not found")
                }
                this.quantityText
                    .setText(
                        `${this.nextPlacedItem.animalInfo?.harvestQuantityRemaining || 0}/${
                            animal.maxHarvestQuantity || 0
                        }`
                    )
                    .setDepth(this.depth + 31)
            }
        } else {
            // if bubble state is present, remove it
            if (this.bubbleState) {
                this.bubbleState.removeAll(true)
                this.bubbleState.destroy()
                this.bubbleState = undefined
            }
        }
    }

    private updateAnimalInfoTimer() {
        if (!this) {
            throw new Error("Container not found")
        }
        if (!this.nextPlacedItem?.animalInfo) {
            throw new Error("Animal info not found")
        }

        if (
            this.nextPlacedItem.animalInfo.currentState != AnimalCurrentState.Yield
        ) {
            if (!this.timer) {
                const text = new Text({
                    baseParams: {
                        scene: this.scene,
                        x: 0,
                        y: -25,
                        text: "",
                    },
                    options: {
                        fontSize: 32,
                        enableStroke: true,
                    },
                })
                    .setVisible(false)
                    .setOrigin(0.5, 1)
                    .setDepth(
                        calculateGameplayDepth({
                            layer: GameplayLayer.Effects,
                        })
                    )
                this.scene.add.existing(text)
                this.timer = text
                this.pinLocal(this.timer, {
                    syncScale: false,
                    syncPosition: true,
                })
            }

            const animal = this.animals.find((animal) => {
                if (!this.nextPlacedItem) {
                    throw new Error("Current placed item not found")
                }
                const placedItemType = this.placedItemTypes.find((placedItemType) => {
                    if (!this.nextPlacedItem) {
                        throw new Error("Current placed item not found")
                    }
                    return placedItemType.id === this.nextPlacedItem.placedItemType
                })
                if (!placedItemType) {
                    throw new Error("Placed item type not found")
                }
                return animal.id === placedItemType.animal
            })

            if (animal?.growthTime == undefined) {
                throw new Error("Animal growth time not found")
            }

            const formattedTime = formatTime(
                Math.round(
                    animal.growthTime - this.nextPlacedItem.animalInfo.currentGrowthTime
                )
            )
            this.timer.setText(formattedTime)
        } else {
            if (this.timer) {
                this.remove(this.timer, true)
                this.timer = undefined
            }
        }
    }

    private getAssetData(): AssetData | undefined {
        if (!this.nextPlacedItem) {
            throw new Error("Placed item not found")
        }
        const placedItemType = this.placedItemTypes.find((placedItemType) => {
            if (!this.nextPlacedItem) {
                throw new Error("Current placed item not found")
            }
            return placedItemType.id === this.nextPlacedItem.placedItemType
        })
        if (!placedItemType) {
            throw new Error("Placed item type not found")
        }
        switch (placedItemType.type) {
        case PlacedItemType.Tile: {
            if (!placedItemType.tile) {
                throw new Error("Tile ID not found")
            }
            const tile = this.tiles.find((tile) => tile.id === placedItemType.tile)
            if (!tile) {
                throw new Error("Tile not found")
            }
            return tileAssetMap[tile.displayId]
        }
        case PlacedItemType.Building: {
            if (!placedItemType.building) {
                throw new Error("Building ID not found")
            }
            const building = this.buildings.find(
                (building) => building.id === placedItemType.building
            )
            if (!building) {
                throw new Error("Building not found")
            }
            return buildingAssetMap[building.displayId].map
        }
        case PlacedItemType.Animal: {
            if (!placedItemType.animal) throw new Error("Animal ID not found")
            const animal = this.animals.find(
                (animal) => animal.id === placedItemType.animal
            )
            if (!animal) {
                throw new Error("Animal not found")
            }
            const animalAge = this.nextPlacedItem?.animalInfo?.isAdult
                ? AnimalAge.Adult
                : AnimalAge.Baby
            return animalAssetMap[animal.displayId].map[animalAge]
        }
        case PlacedItemType.Fruit: {
            if (!placedItemType.fruit) {
                throw new Error("Fruit ID not found")
            }
            const fruit = this.fruits.find(
                (fruit) => fruit.id === placedItemType.fruit
            )
            if (!fruit) {
                throw new Error("Fruit not found")
            }
            const fruitStage = this.nextPlacedItem?.fruitInfo?.currentStage
            if (fruitStage === undefined) {
                throw new Error("Fruit stage not found")
            }
            return fruitAssetMap[fruit.displayId].map[fruitStage]
        }
        }
    }

    public setTintColor(tintColor: number) {
        if (this.mainVisual) {
            if (this.mainVisual instanceof Phaser.GameObjects.Sprite) {
                this.mainVisual.setTint(tintColor)
            } else if (this.mainVisual instanceof SpineGameObject) {
                const r = ((tintColor >> 16) & 0xff) / 255
                const g = ((tintColor >> 8) & 0xff) / 255
                const b = (tintColor & 0xff) / 255

                this.mainVisual.skeleton.slots.forEach((slot) => {
                    slot.color.set(r, g, b, 1)
                })
            }
        }
        if (this.plantInfoSprite) {
            this.plantInfoSprite.setTint(tintColor)
        }
    }

    public clearTintColor() {
        if (this.mainVisual) {
            if (this.mainVisual instanceof Phaser.GameObjects.Sprite) {
                this.mainVisual.clearTint()
            } else if (this.mainVisual instanceof SpineGameObject) {
                this.mainVisual.skeleton.slots.forEach((slot) => {
                    slot.color.set(1, 1, 1, 1)
                })
            }
        }
        if (this.plantInfoSprite) {
            this.plantInfoSprite.clearTint()
        }
    }
}

export interface AssetData {
  textureConfig: TextureConfig;
}
