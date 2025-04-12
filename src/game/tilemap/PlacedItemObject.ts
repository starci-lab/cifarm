import {
    AnimalCurrentState,
    AnimalSchema,
    BeeHouseCurrentState,
    BuildingKind,
    BuildingSchema,
    CropSchema,
    FlowerSchema,
    FruitCurrentState,
    FruitSchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeSchema,
    PlantCurrentState,
    PlantType,
    Position,
    ProductSchema,
} from "@/modules/entities"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import {
    OverlapSizer,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import {
    assetMiscMap,
    assetStateMap,
    AssetMiscId,
    assetIconMap,
    AssetIconId,
    assetBuildingMap,
    AssetTextureData,
    assetCropMap,
    assetFlowerMap,
} from "@/modules/assets"
import { CacheKey } from "../types"
import { Text, TextColor } from "../ui"
import { TILE_HEIGHT, TILE_WIDTH } from "./constants"
import { SpineGameObject } from "@esotericsoftware/spine-phaser"
import {
    setTintForMainVisual,
    clearTintForMainVisual,
    createMainVisual,
    getAssetData,
    getMainVisualOffsets,
} from "./utils"

export class PlacedItemObject extends ContainerLite {
    private plantInfoSprite: Phaser.GameObjects.Sprite | undefined
    public mainVisual: Phaser.GameObjects.Sprite | SpineGameObject | undefined
    private bubbleState: OverlapSizer | undefined
    private quantityText: Text | undefined
    public currentPlacedItem: PlacedItemSchema | undefined
    private nextPlacedItem: PlacedItemSchema | undefined
    private fertilizerParticle: Phaser.GameObjects.Sprite | undefined
    private starsSizer: Sizer | undefined
    private crops: Array<CropSchema>
    private products: Array<ProductSchema>
    private animals: Array<AnimalSchema>
    private placedItemTypes: Array<PlacedItemTypeSchema>
    private buildings: Array<BuildingSchema>
    private fruits: Array<FruitSchema>
    private flowers: Array<FlowerSchema>

    public ignoreCollision?: boolean
    public isPressedForAction = false
    public placedItemType: PlacedItemTypeSchema | undefined

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.crops = scene.cache.obj.get(CacheKey.Crops)
        this.products = scene.cache.obj.get(CacheKey.Products)
        this.animals = scene.cache.obj.get(CacheKey.Animals)
        this.placedItemTypes = scene.cache.obj.get(CacheKey.PlacedItemTypes)
        this.buildings = scene.cache.obj.get(CacheKey.Buildings)
        this.fruits = scene.cache.obj.get(CacheKey.Fruits)
        this.flowers = scene.cache.obj.get(CacheKey.Flowers)
    }

    public setIsPressedForAction() {
        if (this.isPressedForAction) {
            return
        }
        this.isPressedForAction = true
        this.scene.time.delayedCall(1000, () => {
            this.isPressedForAction = false
        })
    }
    
    public getOccupiedTiles() {
        const occupiedTiles: Array<Position> = []
        if (!this.placedItemType) {
            throw new Error("Placed item type not found")
        }
        if (!this.currentPlacedItem) {
            throw new Error("Placed item not found")
        }
        for (let dx = 0; dx < this.placedItemType.sizeX; dx++) {
            for (let dy = 0; dy < this.placedItemType.sizeY; dy++) {
                occupiedTiles.push({
                    x: this.currentPlacedItem.x - dx,
                    y: this.currentPlacedItem.y - dy,
                })
            }
        }
        return occupiedTiles
    }

    public updateContent(placedItem: PlacedItemSchema) {
        this.placedItemType = this.placedItemTypes.find(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
        this.nextPlacedItem = placedItem
        if (!this.placedItemType) {
            throw new Error("Placed item type not found")
        }
        if (!this.nextPlacedItem) {
            throw new Error("Placed item not found")
        }
        this.updateMainVisual()
        switch (this.placedItemType.type) {
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
        if (!this.nextPlacedItem.plantInfo) {
            // remove everything in the container
            this.destroyAllChildren(true)
        } else {
            // Update the texture
            this.updatePlantInfoTexture()

            // Update the bubble state
            this.updatePlantInfoBubble()

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
        }
    }
    private updateBuildingInfo() {
        if (!this.nextPlacedItem) {
            throw new Error("Placed item not found")
        }
        if (!this.nextPlacedItem.buildingInfo) {
            // remove everything in the container
            this.destroyAllChildren()
        } else {
            // Update the star based on level
            this.updateBuildingUpgrade()
            // Update the bubble state
            this.updateBeeHouseInfoBubble()
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
        }
    }

    private updateFruitInfoBubble() {
        if (!this.nextPlacedItem?.fruitInfo) {
            throw new Error("Fruit info not found")
        }
        if (
            this.nextPlacedItem.fruitInfo.currentState !== FruitCurrentState.Normal
        ) {
            // use the product icon
            const fruit = this.fruits.find((fruit) => {
                if (!this.placedItemType?.fruit) {
                    throw new Error("Placed item fruit not found")
                }
                return fruit.id === this.placedItemType.fruit
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
                        assetMiscMap[AssetMiscId.BubbleState].phaser.base.assetKey
                    )
                    this.bubbleState = this.scene.rexUI.add
                        .overlapSizer({
                            width: background.width,
                            height: background.height,
                            originY: 1,
                        })
                        .addBackground(background)
                        .setDepth(this.depth + 30)
                        .setPosition((-3/8) * TILE_WIDTH, (-3/2) * TILE_HEIGHT)
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
                    const textureData =
            assetStateMap.fruit[this.nextPlacedItem.fruitInfo.currentState]
                ?.phaser.base
                    if (!textureData) {
                        throw new Error("Texture config not found")
                    }
                    const { assetKey } = textureData
                    if (!assetKey) {
                        throw new Error("State key not found")
                    }
                    const icon = this.scene.add
                        .image(0, 0, assetKey)
                        .setDepth(this.depth + 31)
                    if (this.bubbleState) {
                        this.bubbleState
                            .add(icon, {
                                align: "center",
                                expand: false,
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

    private updateBuildingUpgrade() {
        if (!this.nextPlacedItem) {
            throw new Error("Placed item not found")
        }
        if (!this.nextPlacedItem?.buildingInfo) {
            throw new Error("Building info not found")
        }
        //if home not show star
        const placedItemType = this.placedItemTypes.find(
            (placedItemType) =>
                placedItemType.id === this.nextPlacedItem?.placedItemType
        )
        const building = this.buildings.find(
            (building) => building.id === placedItemType?.building
        )
        if (
            !building?.upgradeable
        ) {
            return
        }

        const stars = this.nextPlacedItem.buildingInfo.currentUpgrade || 0
        const starKey =
      assetIconMap[AssetIconId.PurpleStar].base.assetKey

        const placedItemTypes = this.placedItemTypes.find(
            (placedItemType) =>
                placedItemType.id === this.nextPlacedItem?.placedItemType
        )
        if (!placedItemTypes) {
            throw new Error("Placed item type not found")
        }
        const { x = 0, y = 0 } = {
            ...assetBuildingMap[building.displayId].phaser.starsConfig?.extraOffsets,
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

    public destroyAllChildren(exceptMainVisual = false) {
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
            let assetData: AssetTextureData | undefined
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
                console.log(assetCropMap[crop.displayId].phaser.map.stages)
                assetData =
            assetCropMap[crop.displayId].phaser.map.stages?.[
                this.nextPlacedItem.plantInfo.currentStage
            ].texture
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
            assetFlowerMap[flower.displayId].phaser.map.stages?.[
                this.nextPlacedItem.plantInfo.currentStage
            ].texture
                break
            }

            default:
                break
            }
            if (!assetData) {
                throw new Error("Asset data not found")
            }
            const { assetKey, extraOffsets } = assetData
            const { x = 0, y = 0 } = { ...extraOffsets }
            if (this.plantInfoSprite) {
                // destroy the previous sprite
                this.remove(this.plantInfoSprite, true)
            }
            this.plantInfoSprite = this.scene.add
                .sprite(x, y, assetKey)
                .setOrigin(0.5, 1)
                .setDepth(this.depth + 20)
            this.addLocal(this.plantInfoSprite)
        }
    }

    private updatePlantInfoBubble() {
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
                        assetMiscMap[AssetMiscId.BubbleState].phaser.base.assetKey
                    )
                    this.bubbleState = this.scene.rexUI.add
                        .overlapSizer({
                            width: background.width,
                            height: background.height,
                            originY: 1,
                        })
                        .addBackground(background)
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
            assetStateMap.plant[this.nextPlacedItem.plantInfo.currentState]
                ?.phaser.base.assetKey
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
        if (!this.nextPlacedItem?.plantInfo) {
            throw new Error("Seed growth info not found")
        }
        if (this.nextPlacedItem.plantInfo.isFertilized) {
            // Create fertilizer sprite if it doesn’t exist
            if (!this.fertilizerParticle) {
                const { assetKey, extraOffsets } = assetMiscMap[AssetMiscId.FertilizerParticle].phaser.base
                const { x = 0, y = 0 } = { ...extraOffsets }
                this.fertilizerParticle = this.scene.add
                    .sprite(
                        x,
                        y,
                        assetKey
                    ) // Using sprite instead of image
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

    private updateMainVisual() {
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
            this.currentPlacedItem
        ) {
            switch (placedItemType.type) {
            case PlacedItemType.Animal: {
                // check if the isAdult property has changed
                if (
                    this.currentPlacedItem.animalInfo?.isAdult ===
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
        const assetData = getAssetData({
            placedItemType,
            scene: this.scene,
            isAdult: this.nextPlacedItem.animalInfo?.isAdult,
            fruitStage: this.nextPlacedItem.fruitInfo?.currentStage,
        })
        if (!assetData) {
            throw new Error("Asset data not found")
        }
        const { type, texture, spine } = assetData

        if (this.mainVisual) {
            this.remove(this.mainVisual, true)
        }
        this.mainVisual = createMainVisual({
            type,
            texture,
            spine,
            scene: this.scene,
        })
        const offsets = getMainVisualOffsets({
            type,
            spine,
            texture,
        })
        this.mainVisual.setPosition(offsets.x, offsets.y).setDepth(this.depth + 10)
        this.addLocal(this.mainVisual)
    }

    private updateAnimalInfoBubble() {
        if (!this.nextPlacedItem?.animalInfo) {
            throw new Error("Animal info not found")
        }

        if (
            this.nextPlacedItem.animalInfo.currentState !== AnimalCurrentState.Normal
        ) {
            const animal = this.animals.find((animal) => {
                if (!this.placedItemType?.animal) {
                    throw new Error("Placed item type not found")
                }
                return animal.id === this.placedItemType.animal
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
                        assetMiscMap[AssetMiscId.BubbleState].phaser.base.assetKey
                    )
                    this.bubbleState = this.scene.rexUI.add
                        .overlapSizer({
                            width: background.width,
                            height: background.height,
                            originY: 1,
                        })
                        .addBackground(background)
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
                    const textureData =
            assetStateMap.animal[this.nextPlacedItem.animalInfo.currentState]
                ?.phaser.base
                    if (!textureData) {
                        throw new Error("Texture config not found")
                    }
                    const { assetKey } = textureData
                    if (!assetKey) {
                        throw new Error("State key not found")
                    }
                    const icon = this.scene.add
                        .image(0, 0, assetKey)
                        .setDepth(this.depth + 31)
                    if (this.bubbleState) {
                        this.bubbleState
                            .add(icon, {
                                align: "center",
                                expand: false,
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

    private updateBeeHouseInfoBubble() {
        const building = this.buildings.find((building) => {
            return building.id === this.placedItemType?.building
        })
        if (!building) {
            throw new Error("Building not found")
        }
        if (building.kind !== BuildingKind.BeeHouse) {
            return
        } 

        if (
            this.nextPlacedItem?.beeHouseInfo?.currentState !== BeeHouseCurrentState.Normal
        ) {
            if (
                this.currentPlacedItem?.beeHouseInfo?.currentState !==
        this.nextPlacedItem?.beeHouseInfo?.currentState
            ) {
                if (!this.bubbleState) {
                    const background = this.scene.add.image(
                        0,
                        0,
                        assetMiscMap[AssetMiscId.BubbleState].phaser.base.assetKey
                    )
                    this.bubbleState = this.scene.rexUI.add
                        .overlapSizer({
                            width: background.width,
                            height: background.height,
                            originY: 1,
                        })
                        .addBackground(background)
                        .setDepth(this.depth + 30)
                        .setPosition((-3/8) * TILE_WIDTH, (-3/2) * TILE_HEIGHT)
                    this.addLocal(this.bubbleState)
                } else {
                    this.bubbleState.removeAll(true)
                }

                const text = `${
                    this.nextPlacedItem?.beeHouseInfo?.harvestQuantityRemaining || 0
                }/${this.nextPlacedItem?.beeHouseInfo?.harvestQuantityDesired || 0}`

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
                    })
                    .layout()
            } else if (
                this.currentPlacedItem?.beeHouseInfo?.harvestQuantityRemaining !==
                this.nextPlacedItem?.beeHouseInfo?.harvestQuantityRemaining
            ) {
                if (!this.quantityText) {
                    throw new Error("Quantity text not found")
                }
                this.quantityText
                    .setText(
                        `${this.nextPlacedItem?.beeHouseInfo?.harvestQuantityRemaining || 0}/${
                            this.nextPlacedItem?.beeHouseInfo?.harvestQuantityDesired || 0
                        }`
                    )
                    .setDepth(this.depth + 31)
            } 
        }else {
            // if bubble state is present, remove it
            if (this.bubbleState) {
                this.bubbleState.removeAll(true)
                this.bubbleState.destroy()
                this.bubbleState = undefined
            }
        }
    }

    public setTint(tintColor: number) {
        if (this.mainVisual) {
            setTintForMainVisual(this.mainVisual, tintColor)
        }
        if (this.plantInfoSprite) {
            this.plantInfoSprite.setTint(tintColor)
        }
    }

    public clearTint() {
        if (this.mainVisual) {
            clearTintForMainVisual(this.mainVisual)
        }
        if (this.plantInfoSprite) {
            this.plantInfoSprite.clearTint()
        }
    }
}
