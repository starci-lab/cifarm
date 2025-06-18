import {
    ActionName,
    BuyAnimalData,
    BuyBuildingData,
    BuyDecorationData,
    BuyFruitData,
    BuyPetData,
    BuyTileData,
    EmitActionPayload,
    HarvestAnimalData,
    HarvestBeeHouseData,
    HarvestFruitData,
    HarvestPlantData,
    HelpUseAnimalMedicineReasonCode,
    HelpUseBugNetReasonCode,
    HelpUseHerbicideReasonCode,
    HelpUsePesticideReasonCode,
    ThiefAnimalData,
    ThiefAnimalReasonCode,
    ThiefBeeHouseData,
    ThiefBeeHouseReasonCode,
    ThiefFruitData,
    ThiefFruitReasonCode,
    ThiefPlantData,
    ThiefPlantReasonCode,
    UseAnimalMedicineReasonCode,
    UseBugNetReasonCode,
    UseHerbicideReasonCode,
    UsePesticideReasonCode,
    UseWateringCanReasonCode,
} from "@/singleton"
import {
    Activities,
    AnimalSchema,
    BuildingKind,
    BuildingSchema,
    CropSchema,
    DecorationSchema,
    DecorationType,
    FlowerSchema,
    FruitSchema,
    InteractionPermissions,
    InventorySchema,
    InventoryTypeSchema,
    PetSchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeId,
    PlacedItemTypeSchema,
    Position,
    ProductSchema,
    ProductType,
    SupplySchema,
    TerrainSchema,
    TileSchema,
    ToolSchema,
    UserSchema,
} from "@/types"
import { getSellInfoFromPlacedItemType } from "@/utils"
import { PartialDeep } from "type-fest"
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
} from "@/modules/event-emitter"
import { SceneEventName } from "@/modules/event-emitter"
import { sleep } from "@/modules/common"
import { assetDecorationMap, AssetIconId, assetProductMap, Direction } from "@/modules/assets"
import { assetIconMap } from "@/modules/assets"
import { PlayerContext } from "@/redux"
import { FADE_HOLD_TIME, FADE_TIME } from "../constants"
import _ from "lodash"

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
    protected pets: Array<PetSchema>
    protected inventories: Array<InventorySchema>
    protected terrains: Array<TerrainSchema>
    protected interactionPermissions: InteractionPermissions
    protected decorations: Array<DecorationSchema>

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
        this.pets = this.scene.cache.obj.get(CacheKey.Pets)
        this.inventories = this.scene.cache.obj.get(CacheKey.Inventories)
        this.terrains = this.scene.cache.obj.get(CacheKey.Terrains)
        this.decorations = this.scene.cache.obj.get(CacheKey.Decorations)
        this.interactionPermissions = this.scene.cache.obj.get(CacheKey.InteractionPermissions)
        // add the decorations to the cache
        ExternalEventEmitter.on(ExternalEventName.Visit, (user: UserSchema) => {
            // save to cache
            this.scene.cache.obj.add(CacheKey.WatchingUser, user)
            this.handeVisit()
        })

        ExternalEventEmitter.on(ExternalEventName.Return, () => {
            // remove the watching user
            this.scene.cache.obj.remove(CacheKey.WatchingUser)
            this.handeVisit()
        })

        SceneEventEmitter.on(SceneEventName.UserRefreshed, () => {
            this.user = this.scene.cache.obj.get(CacheKey.User)
        })

        SceneEventEmitter.on(SceneEventName.InventoriesRefreshed, () => {
            this.inventories = this.scene.cache.obj.get(CacheKey.Inventories)
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

            this.addEdgesToFences()
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

            this.addEdgesToFences()
        }

        ExternalEventEmitter.on(
            ExternalEventName.ActionEmitted,
            (data: EmitActionPayload) => {
                if (!data.placedItem) {
                    throw new Error("Placed item not found")
                }
                // get the placed item id
                const placedItemId = data.placedItem.id
                if (placedItemId) {
                    const placedItem = this.placedItemObjectMap[placedItemId]
                    if (!placedItem) {
                        throw new Error("Placed item not found")
                    }
                    // destroy the animated item
                    placedItem.animatedItem?.object.destroy()
                }
                // thus, switch case based on action
                const position = this.getPositionFromPlacedItem(data.placedItem)
                switch (data.action) {
                case ActionName.UseWateringCan: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useWateringCan.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useWateringCan.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case UseWateringCanReasonCode.NotNeedWateringCan: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not need watering can",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.PlantSeed: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.plantSeed.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.plantSeed.experiencesGain ?? 0,
                            },
                        ])
                    }
                    break
                }
                case ActionName.UsePesticide: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.usePesticide.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.usePesticide.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case UsePesticideReasonCode.NotNeedPesticide: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not need pesticide",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.HelpUsePesticide: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.helpUsePesticide.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity:
                                        this.activities.helpUsePesticide.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case HelpUsePesticideReasonCode.NotNeedPesticide: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not need pesticide",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.UseHerbicide: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useHerbicide.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useHerbicide.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case UseHerbicideReasonCode.NotNeedHerbicide: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not need herbicide",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.HelpUseHerbicide: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.helpUseHerbicide.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity:
                                        this.activities.helpUseHerbicide.experiencesGain ?? 0,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case HelpUseHerbicideReasonCode.NotNeedHerbicide: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not need herbicide",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.UseFertilizer: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useFertilizer.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useFertilizer.experiencesGain ?? 0,
                            },
                        ])
                    }
                    break
                }
                case ActionName.HarvestPlant: {
                    if (data.success) {
                        const { quantity, productId } = data.data as HarvestPlantData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                                assetProductMap[product.displayId].base.assetKey
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
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.harvestPlant.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                                badgeIconAssetKey:
                                        product.isQuality
                                            ? assetIconMap[AssetIconId.QualityStar]?.phaser?.base.assetKey
                                            : undefined,
                            },
                        ])
                    }
                    break
                }
                case ActionName.BuyTile: {
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
                                iconAssetKey: assetIconMap[AssetIconId.Gold]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -tile.price,
                            },
                        ])
                    }
                    break
                }
                case ActionName.BuyAnimal: {
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
                                iconAssetKey: assetIconMap[AssetIconId.Gold]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -animal.price,
                            },
                        ])
                    }
                    break
                }
                case ActionName.BuyPet: {
                    if (data.success) {
                        const { petId } = data.data as BuyPetData
                        const pet = this.pets.find(
                            (pet) => pet.id === petId
                        )
                        if (!pet) {
                            throw new Error("Pet not found")
                        }
                        if (!pet.price) {
                            throw new Error("Animal price not found")
                        }
                        // get the tile position
                        this.createFlyItems([
                            {
                                iconAssetKey: assetIconMap[AssetIconId.Gold]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -pet.price,
                            },
                        ])
                    }
                    break
                }
                case ActionName.BuyDecoration: {
                    if (data.success) {
                        const { decorationId } = data.data as BuyDecorationData
                        const decoration = this.decorations.find((decoration) => decoration.id === decorationId)
                        if (!decoration) {
                            throw new Error("Decoration not found")
                        }
                        if (!decoration.price) {
                            throw new Error("Decoration price not found")
                        }
                        // get the tile position
                        this.createFlyItems([
                            {
                                iconAssetKey: assetIconMap[AssetIconId.Gold]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -decoration.price,
                            },
                        ])
                    }
                    break
                }
                case ActionName.BuyFruit: {
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
                                iconAssetKey: assetIconMap[AssetIconId.Gold]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -fruit.price,
                            },
                        ])
                    }
                    break
                }
                case ActionName.BuyBuilding: {
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
                                iconAssetKey: assetIconMap[AssetIconId.Gold]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -building.price,
                            },
                        ])
                    }
                    break
                }
                case ActionName.ThiefPlant: {
                    if (data.success) {
                        const { quantity, productId, catAssistedSuccess } = data.data as ThiefPlantData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                                assetProductMap[product.displayId].base.assetKey
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.thiefPlant.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.thiefPlant.experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                                badgeIconAssetKey:
                                        product.isQuality
                                            ? assetIconMap[AssetIconId.QualityStar]?.phaser?.base.assetKey
                                            : undefined,
                            },
                            ...(catAssistedSuccess ? [{
                                iconAssetKey: assetIconMap[AssetIconId.Cat].phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                text: "Cat assisted",
                            }] : []),
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case ThiefPlantReasonCode.DogAssisted:
                            this.createFlyItems([
                                {
                                    iconAssetKey: assetIconMap[AssetIconId.Dog].phaser?.base.assetKey,
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Dog assisted",
                                },
                            ])
                            break
                        case ThiefPlantReasonCode.NotFullyMatured: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not fully matured",
                                },
                            ])
                            break
                        }
                        case ThiefPlantReasonCode.NotPlanted: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not planted",
                                },
                            ])
                            break
                        }
                        case ThiefPlantReasonCode.QuantityReactMinimum: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Quantity react minimum",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.UseAnimalMedicine: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useAnimalMedicine.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useAnimalMedicine.experiencesGain,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case UseAnimalMedicineReasonCode.NotNeedAnimalMedicine: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not need animal medicine",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.UseAnimalFeed: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useAnimalFeed.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useAnimalFeed.experiencesGain,
                            },
                        ])
                    }
                    break
                }
                case ActionName.HarvestAnimal: {
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
                                assetProductMap[product.displayId].base.assetKey

                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.harvestAnimal.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                                badgeIconAssetKey:
                                        product.isQuality
                                            ? assetIconMap[AssetIconId.QualityStar]?.phaser?.base.assetKey
                                            : undefined,
                            },
                        ])
                    }
                    break
                }
                case ActionName.HelpUseAnimalMedicine: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity:
                                        -this.activities.helpUseAnimalMedicine.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity:
                                        this.activities.helpUseAnimalMedicine.experiencesGain,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case HelpUseAnimalMedicineReasonCode.NotNeedAnimalMedicine: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not need animal medicine",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.ThiefAnimal: {
                    if (data.success) {
                        const { quantity, productId } = data.data as ThiefAnimalData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                                assetProductMap[product.displayId].base.assetKey

                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.thiefAnimal.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.thiefAnimal.experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                                badgeIconAssetKey:
                                        product.isQuality
                                            ? assetIconMap[AssetIconId.QualityStar]?.phaser?.base.assetKey
                                            : undefined,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case ThiefAnimalReasonCode.NotReadyToHarvest: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not ready to harvest",
                                },
                            ])
                            break
                        }
                        case ThiefAnimalReasonCode.QuantityReactMinimum: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Quantity react minimum",
                                },
                            ])
                            break
                        }
                        case ThiefAnimalReasonCode.DogAssisted: {
                            this.createFlyItems([
                                {
                                    iconAssetKey: assetIconMap[AssetIconId.Dog].phaser?.base.assetKey,
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Dog assisted",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.Sell: {
                    if (data.success) {
                        const placedItemType = this.placedItemTypes.find(
                            (placedItemType) => data.placedItem.placedItemType === placedItemType.id
                        )
                        if (!placedItemType) {
                            throw new Error("Placed item type not found")
                        }
                        const { sellPrice } = getSellInfoFromPlacedItemType({
                            placedItemType,
                            staticData: {
                                tiles: this._tiles,
                                pets: this.pets,
                                crops: this.crops,
                                products: this.products,
                                animals: this.animals,
                                fruits: this.fruits,
                                flowers: this.flowers,
                                buildings: this.buildings,
                            }
                        })
                        if (sellPrice === undefined) {
                            throw new Error("Sell price not found")
                        }
                        this.createFlyItems([
                            {
                                iconAssetKey: assetIconMap[AssetIconId.Gold]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: sellPrice,
                            },
                        ])
                    }
                    break
                }
                case ActionName.HarvestFruit: {
                    if (data.success) {
                        const { quantity, productId } = data.data as HarvestFruitData
                        const product = this.products.find(
                            (product) => product.displayId === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                                assetProductMap[product.displayId].base.assetKey

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
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.harvestFruit.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                                badgeIconAssetKey:
                                        product.isQuality
                                            ? assetIconMap[AssetIconId.QualityStar]?.phaser?.base.assetKey
                                            : undefined,
                            },
                        ])
                    }
                    break
                }
                case ActionName.ThiefFruit: {
                    if (data.success) {
                        const { quantity, productId } = data.data as ThiefFruitData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                                assetProductMap[product.displayId].base.assetKey
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.thiefFruit.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.thiefFruit.experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                                badgeIconAssetKey:
                                        product.isQuality
                                            ? assetIconMap[AssetIconId.QualityStar]?.phaser?.base.assetKey
                                            : undefined,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case ThiefFruitReasonCode.NotFullyMatured: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not fully matured",
                                },
                            ])
                            break
                        }
                        case ThiefFruitReasonCode.QuantityReactMinimum: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Quantity react minimum",
                                },
                            ])
                            break
                        }
                        case ThiefFruitReasonCode.DogAssisted: {
                            this.createFlyItems([
                                {
                                    iconAssetKey: assetIconMap[AssetIconId.Dog].phaser?.base.assetKey,
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Dog assisted",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.UseBugNet: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useBugNet.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useBugNet.experiencesGain,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case UseBugNetReasonCode.NotNeedBugNet: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not need bug net",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.HelpUseWateringCan: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.helpUseWateringCan.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
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
                case ActionName.HelpUseBugNet: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.helpUseBugNet.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.helpUseBugNet.experiencesGain,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case HelpUseBugNetReasonCode.NotNeedBugNet: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not need bug net",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.UseFruitFertilizer: {
                    if (data.success) {
                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.useFruitFertilizer.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.useFruitFertilizer.experiencesGain,
                            },
                        ])
                    }
                    break
                }
                case ActionName.UpgradeBuilding: {
                    if (data.success) {
                        const currentUpgrade = data.placedItem.buildingInfo?.currentUpgrade
                        if (currentUpgrade === undefined) {
                            throw new Error("Current upgrade not found.")
                        }
                        const placedItemType = this.placedItemTypes.find(
                            (placedItemType) => placedItemType.id === data.placedItem.placedItemType
                        )
                        if (!placedItemType) {
                            throw new Error("Placed item type not found.")
                        }
                        const building = this.buildings.find(
                            (building) => building.id === placedItemType?.building
                        )
                        if (!building) {
                            throw new Error("Building not found.")
                        }
                        const price = building.upgrades?.find(
                            (upgrade) => upgrade.upgradeLevel === currentUpgrade
                        )?.upgradePrice
                        if (price === undefined) {
                            throw new Error("Price not found.")
                        }
                        // get the tile position
                        this.createFlyItems([
                            {
                                iconAssetKey: assetIconMap[AssetIconId.Gold]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -price,
                            },
                        ])
                    }
                    break
                }
                case ActionName.HarvestBeeHouse: {
                    if (data.success) {
                        const { quantity, productId } = data.data as HarvestBeeHouseData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        let experiencesGain = 0
                        switch (product.type) {
                        case ProductType.BeeHouse: {
                            const building = this.buildings.find(
                                (building) => building.id === product.building
                            )
                            if (!building) {
                                throw new Error("Building not found")
                            }
                            if (building.kind !== BuildingKind.BeeHouse) {
                                throw new Error("Building kind not found")
                            }
                            if (!building.beeHouseBasicHarvestExperiences) {
                                throw new Error("Basic harvest experiences not found")
                            }
                            if (!building.beeHouseQualityHarvestExperiences) {
                                throw new Error("Quality harvest experiences not found")
                            }
                            experiencesGain = product.isQuality
                                ? building.beeHouseQualityHarvestExperiences
                                : building.beeHouseBasicHarvestExperiences
                            break
                        }
                        }
                        const assetKey =
                                assetProductMap[product.displayId].base.assetKey

                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.harvestBeeHouse.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                                badgeIconAssetKey:
                                        product.isQuality
                                            ? assetIconMap[AssetIconId.QualityStar]?.phaser?.base.assetKey
                                            : undefined,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case ThiefBeeHouseReasonCode.NotReadyToHarvest: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not ready to harvest",
                                },
                            ])
                            break
                        }
                        case ThiefBeeHouseReasonCode.QuantityReactMinimum:
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Quantity react minimum",
                                },
                            ])
                            break
                        case ThiefBeeHouseReasonCode.DogAssisted:
                            this.createFlyItems([
                                {
                                    iconAssetKey: assetIconMap[AssetIconId.Dog].phaser?.base.assetKey,
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Dog assisted",
                                },
                            ])
                            break
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                case ActionName.ThiefBeeHouse: {
                    if (data.success) {
                        const { quantity, productId } = data.data as ThiefBeeHouseData
                        const product = this.products.find(
                            (product) => product.id === productId
                        )
                        if (!product) {
                            throw new Error("Product not found")
                        }
                        const assetKey =
                                assetProductMap[product.displayId].base.assetKey

                        this.createFlyItems([
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Energy]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: -this.activities.thiefBeeHouse.energyConsume,
                            },
                            {
                                iconAssetKey:
                                        assetIconMap[AssetIconId.Experience]?.phaser?.base.assetKey,
                                x: position.x,
                                y: position.y,
                                quantity: this.activities.thiefBeeHouse.experiencesGain,
                            },
                            {
                                iconAssetKey: assetKey,
                                x: position.x,
                                y: position.y,
                                quantity,
                                badgeIconAssetKey:
                                        product.isQuality
                                            ? assetIconMap[AssetIconId.QualityStar]?.phaser?.base.assetKey
                                            : undefined,
                            },
                        ])
                    } else {
                        switch (data.reasonCode) {
                        case ThiefBeeHouseReasonCode.NotReadyToHarvest: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Not ready to harvest",
                                },
                            ])
                            break
                        }
                        case ThiefBeeHouseReasonCode.QuantityReactMinimum: {
                            this.createFlyItems([
                                {
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Quantity react minimum",
                                },
                            ])
                            break
                        }
                        case ThiefBeeHouseReasonCode.DogAssisted: {
                            this.createFlyItems([
                                {
                                    iconAssetKey: assetIconMap[AssetIconId.Dog].phaser?.base.assetKey,
                                    showIcon: false,
                                    x: position.x,
                                    y: position.y,
                                    text: "Dog assisted",
                                },
                            ])
                            break
                        }
                        default:
                            throw new Error("Unknown reason code")
                        }
                    }
                    break
                }
                }
            }
        )

        ExternalEventEmitter.on(ExternalEventName.ForceSyncPlacedItemsResponsed, () => {
            // SceneEventEmitter.emit(SceneEventName.OpenModal, {
            //     modalName: ModalName.Sell,
            // })
        })
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
                this.deleteObject(placedItem.id)
            }
        }
    }

    protected edges: Record<string, Array<Phaser.GameObjects.Sprite>> = {}
    // a method to add edges to fences
    private addEdgesToFences() {
        // delete all edges
        for (const [, sprites] of Object.entries(this.edges)) {
            for (const sprite of sprites) {
                sprite?.destroy()
            }
        }
        this.edges = {}
        // add edges to fences
        // we tracking all the fences and the connected fences
        const fences: Array<PlacedItemObjectData> = []
        const fenceConnections: Array<FenceConnection> = []
        // filter all fences
        for (const placedItem of Object.values(this.placedItemObjectMap)) {
            const { object } = placedItem
            const { currentPlacedItem, placedItemType } = object
            if (!currentPlacedItem) {
                throw new Error("Current placed item not found")
            }
            if (placedItemType?.type !== PlacedItemType.Decoration) {
                continue
            }
            const decoration = this.decorations.find(
                (decoration) => decoration.id === placedItemType.decoration
            )
            if (!decoration) {
                throw new Error("Decoration not found")
            }
            if (decoration.type !== DecorationType.Fence) {
                continue
            }
            fences.push(placedItem)
            // if there are 2 fences with same place item type ID that connected to each other, add edges to them
        }
        for (const fence of fences) {
            if (!fence.object.currentPlacedItem) {
                throw new Error("Current placed item not found")
            }
            // we get the rest fences
            const restFences = fences.filter((restFence) =>
                restFence.object.currentPlacedItem?.id
                !== fence.object.currentPlacedItem?.id
            )
            // we check if the rest fences are connected to the current fence
            for (const restFence of restFences) {
                if (!restFence.object.currentPlacedItem) {
                    throw new Error("Current placed item not found")
                }
                // continue if the placed item types are not the same
                if (
                    fence.object.currentPlacedItem.placedItemType
                    !== restFence.object.currentPlacedItem.placedItemType
                ) {
                    continue
                }
                // continue if the placed item position is not differ from 1
                // we use manhattan distance to check if the placed item position is differ from 1
                if (
                    Math.abs(
                        fence.object.currentPlacedItem.x - restFence.object.currentPlacedItem.x
                    ) +
                    Math.abs(
                        fence.object.currentPlacedItem.y - restFence.object.currentPlacedItem.y
                    ) !== 1
                ) {
                    continue
                }
                let direction: Direction = Direction.Horizontal
                if (fence.object.currentPlacedItem.x !== restFence.object.currentPlacedItem.x) {
                    direction = Direction.Vertical
                }
                // we check if the fence connection is already exists
                if (fenceConnections.some((connection) =>
                    (
                        connection.fences.some((_fence) => _fence.object.currentPlacedItem?.id === fence.object.currentPlacedItem?.id)
                        && connection.fences.some((_fence) => _fence.object.currentPlacedItem?.id === restFence.object.currentPlacedItem?.id)
                    )
                )) {
                    continue
                }
                // we add the fence connection
                if (!fence.object.currentPlacedItem.placedItemType) {
                    throw new Error("Placed item type not found")
                }
                const placedItemType = this.placedItemTypes.find(
                    (placedItemType) => placedItemType.id === fence.object.currentPlacedItem?.placedItemType
                )
                if (!placedItemType) {
                    throw new Error("Placed item type not found")
                }
                const decoration = this.decorations.find(
                    (decoration) => decoration.id === fence.object.currentPlacedItem?.placedItemType
                )
                if (!decoration) {
                    throw new Error("Decoration not found")
                }
                fenceConnections.push({
                    fences: [fence, restFence],
                    decoration,
                    direction,
                })
            }
        }

        // thus, we process connection by adding edges
        for (const connection of fenceConnections) {
            const posX = (
                (connection.fences[0].object.x)
                + (connection.fences[1].object.x)
            ) / 2
            const posY = (
                (connection.fences[0].object.y)
                + (connection.fences[1].object.y)
            ) / 2
            const edge = assetDecorationMap[connection.decoration.displayId].phaser.edges?.[connection.direction]
            if (!edge) {
                throw new Error("Edge not found")
            }
            const edgeSprite = this.scene.add.sprite(
                posX,
                posY,
                edge.assetKey,
            )
                .setOrigin(0.5, 1)
                .setDepth(
                    Math.floor((connection.fences[0].object.depth + connection.fences[1].object.depth) / 2)
                )

            for (const fence of connection.fences) {
                if (!fence.object.currentPlacedItem) {
                    throw new Error("Current placed item not found")
                }
                const fences: Array<Phaser.GameObjects.Sprite> = this.edges[fence.object.currentPlacedItem?.id ?? ""] || []
                fences.push(edgeSprite)
                this.edges[fence.object.currentPlacedItem?.id ?? ""] = fences
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

    protected getCurrentPlacedItemsData(): PlacedItemsData {
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
            await sleep(400)
        }
    }

    private async handeVisit() {
        // save to cache
        // console.log(toNeighbor)
        SceneEventEmitter.emit(SceneEventName.FadeIn)
        await sleep(FADE_TIME)
        // re-sync the placed items
        const watchingUser = this.scene.cache.obj.get(CacheKey.WatchingUser) as
            | UserSchema
            | undefined
        const userId = watchingUser?.id ?? undefined
        // hide the neighbors modal
        ExternalEventEmitter.emit(ExternalEventName.UpdatePlayerContext, {
            playerContext: userId ? PlayerContext.Neighbor : PlayerContext.Home,
        })
        // turn the event into a promise for better readability
        await new Promise<void>((resolve) => {
            ExternalEventEmitter.once(ExternalEventName.PlacedItemsLoaded, async () => {
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

    protected getCenterPosition({
        x,
        y,
        sizeY = 1,
    }: GetCenterPositionParams) {
        return {
            x: x - this.tileWidth / 2,
            y: y - (sizeY * this.tileHeight) / 2,
        }
    }

    protected getPositionFromPlacedItem(placedItem: PartialDeep<PlacedItemSchema>) {
        const {
            x,
            y,
            placedItemType: placedItemTypeId,
        } = placedItem
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
        return this.getCenterPosition({
            x: tile.getCenterX(),
            y: tile.getCenterY(),
            sizeX: placedItemType.sizeX,
            sizeY: placedItemType.sizeY,
        })
    }
}

export interface GetCenterPositionParams {
    x: number;
    y: number;
    sizeX?: number;
    sizeY?: number;
}

export interface AnimatedItem {
    object: Phaser.GameObjects.Sprite;
}

export interface UpdatePlacedItemLocalParams {
    placedItem: PartialDeep<PlacedItemSchema>;
    type: PlacedItemType;
}

export interface PlacedItemObjectData {
    object: PlacedItemObject;
    animatedItem?: AnimatedItem;
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

// fence connection
export interface FenceConnection {
    fences: Array<PlacedItemObjectData>
    decoration: DecorationSchema
    direction: Direction
}