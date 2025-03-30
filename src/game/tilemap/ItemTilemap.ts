import {
    ActionName,
    BuyAnimalData,
    BuyBuildingData,
    BuyFruitData,
    BuyTileData,
    EmitActionPayload,
    HarvestAnimalData,
    HarvestFruitData,
    HarvestPlantData,
    SellData,
    ThiefAnimalData,
    ThiefFruitData,
    ThiefPlantData,
} from "@/hooks"
import { sleep } from "@/modules/common"
import {
    Activities,
    AnimalSchema,
    BuildingSchema,
    CropSchema,
    FlowerSchema,
    FruitSchema,
    InventoryTypeSchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeId,
    PlacedItemTypeSchema,
    Position,
    ProductSchema,
    ProductType,
    SupplySchema,
    TileSchema,
    ToolSchema,
    UserSchema,
} from "@/modules/entities"
import _ from "lodash"
import { DeepPartial } from "react-hook-form"
import { BaseAssetKey, baseAssetMap, productAssetMap } from "../assets"
import { FADE_HOLD_TIME, FADE_TIME } from "../constants"
import {
    CacheKey,
    PlacedItemsData,
    TilemapBaseConstructorParams,
} from "../types"
import { GroundTilemap } from "./GroundTilemap"
import { PlacedItemObject } from "./PlacedItemObject"
import { LayerName, ObjectLayerName } from "./types"
import { FlyItem, FlyItemOptions } from "../ui"
import { gameplayDepth } from "../depth"
import {
    ExternalEventEmitter,
    ExternalEventName,
    SceneEventEmitter,
} from "../events"
import { SceneEventName } from "../events"

const DEPTH_MULTIPLIER = 100
export abstract class ItemTilemap extends GroundTilemap {
    // item layer
    private itemLayer: Phaser.Tilemaps.ObjectLayer
    // previous placed items
    protected previousPlacedItemsData: PlacedItemsData | undefined

    // place item objects map
    protected placedItemObjectMap: Record<string, PlacedItemObjectData> = {}
    protected activities: Activities
    protected crops: Array<CropSchema>
    protected products: Array<ProductSchema>
    protected user: UserSchema
    protected animals: Array<AnimalSchema>
    protected fruits: Array<FruitSchema>
    protected buildings: Array<BuildingSchema>
    protected _tiles: Array<TileSchema>
    protected supplies: Array<SupplySchema>
    protected tools: Array<ToolSchema>
    protected placedItemTypes: Array<PlacedItemTypeSchema>
    protected inventoryTypes: Array<InventoryTypeSchema>
    protected flowers: Array<FlowerSchema>

    constructor(baseParams: TilemapBaseConstructorParams) {
        super(baseParams)

        const itemLayer = this.getObjectLayer(ObjectLayerName.Item)
        if (!itemLayer) {
            throw new Error("Item layer not found")
        }
        this.itemLayer = itemLayer
        this.user = this.scene.cache.obj.get(CacheKey.User)
        this.activities = this.scene.cache.obj.get(CacheKey.Activities)
        this.crops = this.scene.cache.obj.get(CacheKey.Crops)
        this.products = this.scene.cache.obj.get(CacheKey.Products)
        this.buildings = this.scene.cache.obj.get(CacheKey.Buildings)
        this.animals = this.scene.cache.obj.get(CacheKey.Animals)
        this._tiles = this.scene.cache.obj.get(CacheKey.Tiles)
        this.supplies = this.scene.cache.obj.get(CacheKey.Supplies)
        this.tools = this.scene.cache.obj.get(CacheKey.Tools)
        this.placedItemTypes = this.scene.cache.obj.get(CacheKey.PlacedItemTypes)
        this.inventoryTypes = this.scene.cache.obj.get(CacheKey.InventoryTypes)
        this.fruits = this.scene.cache.obj.get(CacheKey.Fruits)
        this.flowers = this.scene.cache.obj.get(CacheKey.Flowers)

        ExternalEventEmitter.on(ExternalEventName.Visit, (user: UserSchema) => {
            // save to cache
            this.scene.cache.obj.add(CacheKey.WatchingUser, user)
            this.handeVisit()
        })

        SceneEventEmitter.on(SceneEventName.PlacedItemsRefreshed, () => {
            //console.log("update placed items")
            const currentPlaceItemsData = this.getCurrentPlacedItemsData()
            // handle the placed items update
            this.handlePlacedItemsUpdate(
                currentPlaceItemsData,
                this.previousPlacedItemsData
            )
            // update the previous placed items
            this.previousPlacedItemsData = currentPlaceItemsData
        })

        const placedItemsData = this.getCurrentPlacedItemsData()
        if (placedItemsData) {
            // handle the placed items update
            this.handlePlacedItemsUpdate(
                placedItemsData,
                this.previousPlacedItemsData
            )
            // update the previous placed items
            this.previousPlacedItemsData = placedItemsData
        }

        ExternalEventEmitter.on(
            ExternalEventName.ActionEmitted,
            (data: EmitActionPayload) => {
                const {
                    placedItem: { x, y, placedItemType: placedItemTypeId },
                } = data
                if (x === undefined) {
                    throw new Error("X is not found")
                }
                if (y === undefined) {
                    throw new Error("Y is not found")
                }
                const placedItemType = this.placedItemTypes.find(
                    (placedItemType) => placedItemType.id === placedItemTypeId
                )
                if (!placedItemType) {
                    throw new Error("Placed item type not found")
                }
                const tile = this.getTileCenteredAt({
                    tileX: x,
                    tileY: y,
                    layer: LayerName.Ground,
                })
                if (!tile) {
                    throw new Error("Tile not found")
                }
                const position = {
                    x: tile.getCenterX() - this.tileWidth / 2,
                    y: tile.getCenterY() - (placedItemType.sizeY * this.tileHeight) / 2,
                }
                switch (data.action) {
                case ActionName.UseWateringCan:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useWateringCan.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useWateringCan.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                iconAssetKey:   
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useWateringCan.energyConsume,
                            },
                        ])
                    }
                    break

                case ActionName.PlantSeed:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.plantSeed.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.plantSeed.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.plantSeed.energyConsume,
                            },
                        ])
                    }
                    break

                case ActionName.UsePesticide:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.usePesticide.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.usePesticide.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.usePesticide.energyConsume,
                            },
                        ])
                    }
                    break
                case ActionName.HelpUsePesticide:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.helpUsePesticide.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity:
                    this.activities.helpUsePesticide.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.helpUsePesticide.energyConsume,
                            },
                        ])
                    }
                    break
                case ActionName.UseHerbicide:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useHerbicide.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useHerbicide.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useHerbicide.energyConsume,
                            },
                        ])
                    }
                    break
                case ActionName.HelpUseHerbicide:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                        baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.helpUseHerbicide.energyConsume,
                            },
                            {
                                iconAssetKey:
                        baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity:
                    this.activities.helpUseHerbicide.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to use herbicide",
                            },
                        ])
                    }
                    break
                case ActionName.UseFertilizer:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useFertilizer.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useFertilizer.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to use fertilizer",
                            },
                        ])
                    }
                    break
                case ActionName.HarvestPlant:
                    if (data.success) {
                        const { quantity, productId } = data.data as HarvestPlantData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                productAssetMap[product.displayId].base.textureConfig.key
                        let experiencesGain = 0
                        switch (product.type) {
                        case ProductType.Crop: {
                            const crop = this.crops.find(
                                (crop) => crop.id === product.crop
                            )
                            if (!crop) {
                                throw new Error("Crop not found")
                            }
                            experiencesGain = product.isQuality
                                ? crop.qualityHarvestExperiences
                                : crop.basicHarvestExperiences

                            break
                        }
                        case ProductType.Flower: {
                            const flower = this.flowers.find(
                                (flower) => flower.id === product.flower
                            )
                            if (!flower) {
                                throw new Error("Flower not found")
                            }
                            experiencesGain = product.isQuality
                                ? flower.qualityHarvestExperiences
                                : flower.basicHarvestExperiences
                            break
                        }
                        }
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.harvestPlant.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to harvest plant",
                            },
                        ])
                    }
                    break
                case ActionName.BuyTile:
                    if (data.success) {
                        const { tileId } = data.data as BuyTileData
                        const tile = this._tiles.find((tile) => tile.id === tileId)
                        if (!tile) {
                            throw new Error("Tile not found")
                        }
                        if (!tile.price) {
                            throw new Error("Tile price not found")
                        }
                        // get the tile position
                        this.createFlyItems([
                            {
                                iconAssetKey: baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -tile.price,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to buy tile",
                            },
                        ])
                    }
                    break
                case ActionName.BuyAnimal:
                    if (data.success) {
                        const { animalId } = data.data as BuyAnimalData
                        const animal = this.animals.find(
                            (animal) => animal.id === animalId
                        )
                        if (!animal) {
                            throw new Error("Animal not found")
                        }
                        if (!animal.price) {
                            throw new Error("Animal price not found")
                        }
                        // get the tile position
                        this.createFlyItems([
                            {
                                iconAssetKey: baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -animal.price,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to buy animal",
                            },
                        ])
                    }
                    break
                case ActionName.BuyFruit:
                    if (data.success) {
                        const { fruitId } = data.data as BuyFruitData
                        const fruit = this.fruits.find((fruit) => fruit.id === fruitId)
                        if (!fruit) {
                            throw new Error("Fruit not found")
                        }
                        if (!fruit.price) {
                            throw new Error("Fruit price not found")
                        }
                        // get the tile position
                        this.createFlyItems([
                            {
                                iconAssetKey: baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -fruit.price,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to buy fruit",
                            },
                        ])
                    }
                    break
                case ActionName.BuyBuilding:
                    if (data.success) {
                        const { buildingId } = data.data as BuyBuildingData
                        const building = this.buildings.find(
                            (building) => building.id === buildingId
                        )
                        if (!building) {
                            throw new Error("Building not found")
                        }
                        if (!building.price) {
                            throw new Error("Building price not found")
                        }
                        // get the tile position
                        this.createFlyItems([
                            {
                                iconAssetKey: baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -building.price,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to buy building",
                            },
                        ])
                    }
                    break
                case ActionName.ThiefPlant:
                    if (data.success) {
                        const { quantity, productId } = data.data as ThiefPlantData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                productAssetMap[product.displayId].base.textureConfig.key
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.thiefPlant.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.thiefPlant.experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case 1:
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "You are already thieved",
                                },
                            ])
                            break
                        }
                    }
                    break
                case ActionName.UseAnimalMedicine:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                        baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useAnimalMedicine.energyConsume,
                            },
                            {
                                iconAssetKey:
                        baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useAnimalMedicine.experiencesGain,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to use animal medicine",
                            },
                        ])
                    }
                    break
                case ActionName.UseAnimalFeed:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useAnimalFeed.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useAnimalFeed.experiencesGain,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to use animal feed",
                            },
                        ])
                    }
                    break
                case ActionName.HarvestAnimal:
                    if (data.success) {
                        const { quantity, productId } = data.data as HarvestAnimalData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        let experiencesGain = 0
                        switch (product.type) {
                        case ProductType.Animal: {
                            const animal = this.animals.find(
                                (animal) => animal.id === product.animal
                            )
                            if (!animal) {
                                throw new Error("Animal not found")
                            }
                            experiencesGain = product.isQuality
                                ? animal.qualityHarvestExperiences
                                : animal.basicHarvestExperiences
                            break
                        }
                        }
                        const assetKey =
                productAssetMap[product.displayId].base.textureConfig.key

                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.harvestAnimal.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.HarvestAnimal,
                            },
                        ])
                    }
                    break
                case ActionName.HelpUseAnimalMedicine:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity:
                    -this.activities.helpUseAnimalMedicine.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity:
                    this.activities.helpUseAnimalMedicine.experiencesGain,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.HelpUseAnimalMedicine,
                            },
                        ])
                    }
                    break
                case ActionName.ThiefAnimal:
                    if (data.success) {
                        const { quantity, productId } = data.data as ThiefAnimalData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                productAssetMap[product.displayId].base.textureConfig.key

                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.thiefAnimal.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.thiefAnimal.experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.ThiefAnimal,
                            },
                        ])
                    }
                    break
                case ActionName.Sell:
                    if (data.success) {
                        const { quantity } = data.data as SellData
                        this.createFlyItems([
                            {
                                iconAssetKey: baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: quantity,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.Sell,
                            },
                        ])
                    }
                    break

                case ActionName.HarvestFruit:
                    if (data.success) {
                        const { quantity, productId } = data.data as HarvestFruitData
                        const product = this.products.find(
                            (product) => product.displayId === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                productAssetMap[product.displayId].base.textureConfig.key

                        const fruit = this.fruits.find(
                            (fruit) => fruit.id === product.fruit
                        )
                        if (!fruit) {
                            throw new Error("Fruit not found")
                        }
                        let experiencesGain = 0
                        switch (product.type) {
                        case ProductType.Fruit: {
                            experiencesGain = product.isQuality
                                ? fruit.qualityHarvestExperiences
                                : fruit.basicHarvestExperiences
                            break
                        }
                        }
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.harvestFruit.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.HarvestFruit,
                            },
                        ])
                    }
                    break
                case ActionName.ThiefFruit:
                    if (data.success) {
                        const { quantity, productId } = data.data as ThiefFruitData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                productAssetMap[product.displayId].base.textureConfig.key
                        this.createFlyItems([
                            {
                                iconAssetKey:
                        baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.thiefFruit.energyConsume,
                            },
                            {
                                iconAssetKey:
                        baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.thiefFruit.experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.ThiefFruit,
                            },
                        ])
                    }
                    break
                case ActionName.UseBugNet:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.   key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useBugNet.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useBugNet.experiencesGain,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.UseBugNet,
                            },
                        ])
                    }
                    break
                case ActionName.HelpUseWateringCan: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.helpUseWateringCan.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.helpUseWateringCan.experiencesGain,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.HelpUseWateringCan,
                            },
                        ])
                    }
                    break
                }
                case ActionName.HelpUseFruitFertilizer:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity:
                    -this.activities.helpUseFruitFertilizer.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity:
                    this.activities.helpUseFruitFertilizer.experiencesGain,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.HelpUseFruitFertilizer,
                            },
                        ])
                    }
                    break
                case ActionName.HelpUseBugNet:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.helpUseBugNet.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.helpUseBugNet.experiencesGain,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.HelpUseBugNet,
                            },
                        ])
                    }
                    break
                case ActionName.UseFruitFertilizer:
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useFruitFertilizer.energyConsume,
                            },
                            {
                                iconAssetKey:
                    baseAssetMap[BaseAssetKey.UICommonExperience].base.textureConfig.key,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useFruitFertilizer.experiencesGain,
                            },
                        ])
                    } else {
                        this.createFlyItems([
                            {
                                showIcon: false,
                                x: position.x,
                                y: position.y,
                                text: "Failed to " + ActionName.UseFruitFertilizer,
                            },
                        ])
                    }
                    break
                }
            }
        )
    }

    // methods to handle changes in the placed items
    private handlePlacedItemsUpdate(
        current: PlacedItemsData,
        previous?: PlacedItemsData
    ) {
    //if current.userId doesn't match previous.userId, treat all placed items as new
        if (!previous || (previous && current.userId !== previous.userId)) {
            // if user ids are different, create all placed items (treat as new)
            this.clearAllPlacedItems()
            this.createAllPlacedItems(current.placedItems)
            return // exit early to avoid redundant checks later
        }
        // store the unchecked previous placed items
        const checkedPreviousPlacedItems: Array<PlacedItemSchema> = []

        for (const placedItem of current.placedItems) {
            console.log(placedItem.id)
            // if previous doesn't exist or the placed item is not in previous placed items, treat it as new
            const found = previous.placedItems.find(
                (item) => item.id === placedItem.id
            )
            if (found) {
                checkedPreviousPlacedItems.push(placedItem)
                if (placedItem.x !== found.x || placedItem.y !== found.y) {
                    // place the item using the shared tile placing
                    this.placeTileForItem(placedItem)
                } else {
                    // if the placed item is in the previous placed items, update the item
                    const gameObject = this.placedItemObjectMap[placedItem.id]?.object
                    if (!gameObject) {
                        this.placeTileForItem(placedItem)
                        continue
                    }
                    gameObject.updateContent(placedItem)
                    // push the placed item to the checked previous placed items
                }
            } else {
                console.log(
                    `Placing item ${placedItem.id} at ${placedItem.x},${placedItem.y}`
                )
                // place the item using the shared tile placing
                this.placeTileForItem(placedItem)
            }
        }

        // remove the unchecked previous placed items that are no longer in the current placed items
        // Loop through previous placed items to remove any that are no longer present
        for (const placedItem of previous.placedItems) {
            // Check if this item exists in the checked items list
            if (
                !checkedPreviousPlacedItems.some((item) => item.id === placedItem.id)
            ) {
                console.log(
                    `Removing item ${placedItem.id} at ${placedItem.x},${placedItem.y}`
                )
                // remove the object from the item layer
                this.itemLayer.objects = this.itemLayer.objects.filter(
                    (object) => object.name !== placedItem.id
                )
                // remove the object from the tilemap
                const object = this.placedItemObjectMap[placedItem.id]?.object
                if (!object) {
                    throw new Error("Object not found")
                }
                object.clear(true)
                object.destroy()
            }
        }
    }

    // immidiate delete the object
    public deleteObject(placedItemId: string) {
        const gameObject = this.placedItemObjectMap[placedItemId]?.object
        if (!gameObject) {
            throw new Error("Object not found")
        }
        gameObject.clear(true)
        gameObject.destroy()
        delete this.placedItemObjectMap[placedItemId]
    }

    protected clearPlacedItem(placedItem: PlacedItemSchema) {
        const gameObject = this.placedItemObjectMap[placedItem.id]?.object
        const placedItemType = this.placedItemTypes.find(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
        if (!placedItemType) {
            throw new Error("Placed item type not found")
        }
        gameObject.update(placedItemType.type, {
            ...placedItem,
            plantInfo: undefined,
            animalInfo: undefined,
            buildingInfo: undefined,
        })
    }

    // method to create all placed items when user IDs differ
    private createAllPlacedItems(placedItems: Array<PlacedItemSchema>) {
        for (const placedItem of placedItems) {
            // Place the item using the shared tile placing logic
            this.placeTileForItem(placedItem)
        }
    }

    private clearAllPlacedItems() {
        for (const [, value] of Object.entries(this.placedItemObjectMap)) {
            value.object.destroyAllChildren()
            value.object.destroy()
        }
        this.placedItemObjectMap = {}
    }

    //counter to keep track of the tile object id
    private tiledObjectId = 0

    // reusable method to place a tile for a given placed item
    protected placeTileForItem(placedItem: PlacedItemSchema) {
    // get the tile
        const tile = this.getTileCenteredAt({
            tileX: placedItem.x,
            tileY: placedItem.y,
            layer: this.groundLayer,
        })

        // check if the placed item is already in the map
        const gameObject = this.placedItemObjectMap[placedItem.id]?.object
        if (gameObject) {
            gameObject.clear(true)
            gameObject.destroy()
        }

        if (!tile) {
            throw new Error("Tile not found")
        }
        // get the placed item type
        const placedItemType = this.placedItemTypes.find(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
        if (!placedItemType) {
            throw new Error("Placed item type not found")
        }
        // check if tile is home, then we move the camera to it
        if (placedItemType.id === PlacedItemTypeId.Home) {
            const tileAt = this.getTileAt(tile.x, tile.y)
            if (!tileAt) {
                throw new Error("Tile at x,y not found")
            }
        }

        // get the placed item type
        // Fill the area of the item, above the tile
        this.itemLayer.objects.push({
            id: this.tiledObjectId,
            name: placedItem.id,
            type: placedItemType.type,
            visible: true,
            width: 0,
            height: 0,
            ...this.computePositionForTiledObject(tile),
        })

        // create the objects
        const object = this.createFromObjects(ObjectLayerName.Item, {
            id: this.tiledObjectId,
            classType: PlacedItemObject,
        }).at(0) as PlacedItemObject | undefined
        if (!object) {
            throw new Error("Object not found")
        }
        object.setOrigin(1, 0.5).setDepth((tile.x * this.width + tile.y + 1) * DEPTH_MULTIPLIER)
        // store the object in the placed item objects map
        this.placedItemObjectMap[placedItem.id] = {
            object,
        }
        // update the object
        object.updateContent(placedItem)
        // increment the object id to ensure uniqueness
        this.tiledObjectId++
    }

    protected canPlaceItemAtTile({
        tileX,
        tileY,
        tileSizeWidth,
        tileSizeHeight,
    }: CanPlaceItemAtTileParams): boolean {
        const occupiedTiles: Array<Position> = _.flatMap(
            Object.values(this.placedItemObjectMap).filter(
                (item) => !item.object.ignoreCollision
            ),
            (item) => item.object.getOccupiedTiles()
        )
        const dragTiles: Array<Position> = _.range(tileSizeWidth).flatMap((dx) =>
            _.range(tileSizeHeight).map((dy) => ({ x: tileX - dx, y: tileY - dy }))
        )
        return !_.some(dragTiles, (tile) =>
            _.some(occupiedTiles, (occupiedTile) => _.isEqual(occupiedTile, tile))
        )
    }

    private getCurrentPlacedItemsData(): PlacedItemsData {
        const placedItemsData = this.scene.cache.obj.get(
            CacheKey.PlacedItems
        ) as PlacedItemsData
        const { placedItems: cachedPlacedItems, userId } = placedItemsData
        const placedItems = _.cloneDeep<Array<PlacedItemSchema>>(cachedPlacedItems)
        return {
            placedItems,
            userId,
        }
    }

    // method to get the object at a given tile
    protected getObjectAtTile(
        tileX: number,
        tileY: number
    ): PlacedItemObjectData | null {
        const items = Object.values(this.placedItemObjectMap)
        const item = items.find(
            (item) =>
                item.object.currentPlacedItem?.x === tileX &&
        item.object.currentPlacedItem?.y === tileY
        )
        if (!item) {
            return null
        }
        const id = Object.keys(this.placedItemObjectMap).find(
            (key) => this.placedItemObjectMap[key] === item
        )
        if (!id) {
            throw new Error("ID not found")
        }
        return item
    }

    protected findPlacedItemRoot(
        x: number,
        y: number
    ): PlacedItemObjectData | null {
        for (const placedItem of Object.values(this.placedItemObjectMap)) {
            const { object } = placedItem
            const { currentPlacedItem, placedItemType } = object
            if (!currentPlacedItem) {
                throw new Error("Current placed item not found")
            }
            if (!placedItemType) {
                throw new Error("Placed item type not found")
            }
            const { sizeX, sizeY } = placedItemType
            if (!sizeX) {
                throw new Error("SizeX not found")
            }
            if (!sizeY) {
                throw new Error("SizeY not found")
            }
            const { x: centeredTileX, y: centeredTileY } =
        this.getCenteredTileCoordinates(
            currentPlacedItem.x,
            currentPlacedItem.y
        )
            if (
                x <= centeredTileX &&
        x > centeredTileX - sizeX &&
        y <= centeredTileY &&
        y > centeredTileY - sizeY
            ) {
                return placedItem
            }
        }
        return null
    }

    protected async createFlyItems(items: Array<FlyItemOptions>) {
        for (const item of items) {
            const flyItem = new FlyItem({
                baseParams: {
                    scene: this.scene,
                },
                options: item,
            })
            flyItem.setDepth(gameplayDepth.fly)
            this.scene.add.existing(flyItem)
            await sleep(200)
        }
    }

    private async handeVisit() {
    // save to cache
    // console.log(toNeighbor)
        SceneEventEmitter.emit(SceneEventName.FadeIn)
        await sleep(FADE_TIME)
        SceneEventEmitter.emit(SceneEventName.UpdateWatchingStatus)
        // re-sync the placed items
        const watchingUser = this.scene.cache.obj.get(CacheKey.WatchingUser) as
      | UserSchema
      | undefined
        const userId = watchingUser?.id ?? undefined

        // turn the event into a promise for better readability
        await new Promise<void>((resolve) => {
            ExternalEventEmitter.once(ExternalEventName.PlacedItemsLoaded, async() => {
                resolve()
            })
            // Emit the event to request the toolbar inventory index
            ExternalEventEmitter.emit(ExternalEventName.LoadPlacedItems, userId)
        })
        // wait for the placed items to be loaded
        SceneEventEmitter.emit(SceneEventName.CenterCamera)
        await sleep(FADE_HOLD_TIME)
        SceneEventEmitter.emit(SceneEventName.FadeOut)
    }
}

export interface UpdatePlacedItemLocalParams {
  placedItem: DeepPartial<PlacedItemSchema>;
  type: PlacedItemType;
}

export interface PlacedItemObjectData {
  object: PlacedItemObject;
}

export interface CanPlaceItemAtTileParams {
  tileX: number;
  tileY: number;
  tileSizeWidth: number;
  tileSizeHeight: number;
}

export interface HandlePlacedItemUpdatePositionParams {
  placedItemId: string;
  position: Position;
}
