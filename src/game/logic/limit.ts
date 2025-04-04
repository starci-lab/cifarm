import {
    AnimalSchema,
    BuildingKind,
    BuildingSchema,
    DefaultInfo,
    PetSchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeId,
    PlacedItemTypeSchema,
} from "@/modules/entities"
import { Scene } from "phaser"
import { CacheKey } from "../types"

// limit is computed base on the input placed items
// compute for single item type
export type LimitResult = Partial<{
    placedItemCount: number
    selectedLimit: number
    totalLimit: number
    totalPlacedItemCount: number
}>

export interface GetFruitLimitParams {
    scene: Scene
    placedItems: Array<PlacedItemSchema>
}
export const getFruitLimit = ({
    scene,
    placedItems,
}: GetFruitLimitParams): LimitResult => {
    const defaultInfo = scene.cache.obj.get(CacheKey.DefaultInfo) as DefaultInfo
    const fruitLimit = defaultInfo.fruitLimit
    const placedItemTypes = scene.cache.obj.get(
        CacheKey.PlacedItemTypes
    ) as Array<PlacedItemTypeSchema>
    const placedItemTypeFruits = placedItemTypes.filter(
        (placedItemType) => placedItemType.type === PlacedItemType.Fruit
    )
    const placedItemFruits = placedItems.filter((placedItem) =>
        placedItemTypeFruits.some(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
    )
    return {
        totalLimit: fruitLimit,
        totalPlacedItemCount: placedItemFruits.length,
    }
}

export interface GetTileLimitParams {
    scene: Scene
    placedItems: Array<PlacedItemSchema>
}
export const getTileLimit = ({
    scene,
    placedItems,
}: GetTileLimitParams): LimitResult => {
    const defaultInfo = scene.cache.obj.get(CacheKey.DefaultInfo) as DefaultInfo
    const tileLimit = defaultInfo.tileLimit
    const placedItemTypes = scene.cache.obj.get(
        CacheKey.PlacedItemTypes
    ) as Array<PlacedItemTypeSchema>
    const placedItemTypeTiles = placedItemTypes.filter(
        (placedItemType) => placedItemType.type === PlacedItemType.Tile
    )
    const placedItemTiles = placedItems.filter((placedItem) =>
        placedItemTypeTiles.some(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
    )
    return {
        totalLimit: tileLimit,
        totalPlacedItemCount: placedItemTiles.length,
    }
}

export interface GetBuildingLimitParams {
    scene: Scene
    building?: BuildingSchema
    placedItems: Array<PlacedItemSchema>
}
export const getBuildingLimit = ({
    scene,
    building = undefined,
    placedItems,
}: GetBuildingLimitParams): LimitResult => {
    const defaultInfo = scene.cache.obj.get(CacheKey.DefaultInfo) as DefaultInfo
    const buildingLimit = defaultInfo.buildingLimit
    const placedItemTypes = scene.cache.obj.get(
        CacheKey.PlacedItemTypes
    ) as Array<PlacedItemTypeSchema>

    let selectedLimit: number | undefined
    let placedItemCount: number | undefined
    if (building) {
        const placedItemType = placedItemTypes.find(
            (placedItemType) => placedItemType.building === building.id
        )
        if (!placedItemType) {
            throw new Error(`No placed item type found for id: ${building.id}`)
        }
        const placedItemBuildings = placedItems.filter(
            (placedItem) => placedItem.placedItemType === placedItemType.id
        )
        placedItemCount = placedItemBuildings.length
        selectedLimit = building.maxOwnership
    }
    // get the total placed item count
    // get the total placed item count
    const placedItemTypeBuildings = placedItemTypes.filter(
        (placedItemType) => placedItemType.type === PlacedItemType.Building
        && placedItemType.displayId !== PlacedItemTypeId.Home
    )
    const totalPlacedItemBuildings = placedItems.filter((placedItem) =>
        placedItemTypeBuildings.some(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
    )

    return {
        totalPlacedItemCount: totalPlacedItemBuildings.length,
        placedItemCount,
        totalLimit: buildingLimit,
        selectedLimit,
    }
}

export interface GetAnimalLimitParams {
    scene: Scene
    animal: AnimalSchema 
    placedItems: Array<PlacedItemSchema>
}
export const getAnimalLimit = ({
    scene,
    animal,
    placedItems,
}: GetAnimalLimitParams): LimitResult => {
    const buildings = scene.cache.obj.get(
        CacheKey.Buildings
    ) as Array<BuildingSchema>

    const placedItemTypes = scene.cache.obj.get(
        CacheKey.PlacedItemTypes
    ) as Array<PlacedItemTypeSchema>

    const correspondingBuilding = buildings.find(
        (building) => building.animalContainedType === animal.type
    )
    if (!correspondingBuilding) {
        throw new Error(`No building found for animal type: ${animal.type}`)
    }
    const placedItemTypeBuilding = placedItemTypes.find(
        (placedItemType) => placedItemType.id === correspondingBuilding.id
    )
    if (!placedItemTypeBuilding) {
        throw new Error(
            `No placed item type building found for id: ${correspondingBuilding.id}`
        )
    }  
    const placedItemBuildings = placedItems.filter(
        (placedItem) => placedItem.placedItemType === placedItemTypeBuilding.id
    )

    const limit = placedItemBuildings.reduce((acc, placedItem) => {
        const upgrade = correspondingBuilding.upgrades?.find(
            (upgrade) =>
                upgrade.upgradeLevel === placedItem.buildingInfo?.currentUpgrade
        )
        if (!upgrade) {
            throw new Error(
                `No upgrade found for id: ${placedItem.buildingInfo?.currentUpgrade}`
            )
        }
        return acc + upgrade.capacity
    }, 0)

    const placedItemTypeAnimal = placedItemTypes.find(
        (placedItemType) => placedItemType.animal === animal.id
    )
    if (!placedItemTypeAnimal) {
        throw new Error(`No placed item type animal found for id: ${animal.id}`)
    }
    const placedItemAnimals = placedItems.filter(
        (placedItem) => placedItem.placedItemType === placedItemTypeAnimal.id
    )
    return {
        placedItemCount: placedItemAnimals.length,
        selectedLimit: limit,
    }
}

export interface GetPetLimitParams {
    scene: Scene
    pet: PetSchema
    placedItems: Array<PlacedItemSchema>
}
export const getPetLimit = ({
    scene,
    pet,
    placedItems,
}: GetPetLimitParams): LimitResult => {
    const placedItemTypes = scene.cache.obj.get(
        CacheKey.PlacedItemTypes
    ) as Array<PlacedItemTypeSchema>
    const pets = scene.cache.obj.get(
        CacheKey.Pets
    ) as Array<PetSchema>
    const buildings = scene.cache.obj.get(
        CacheKey.Buildings
    ) as Array<BuildingSchema>
    const placedItemTypePets = placedItemTypes.filter((placedItemType) => {
        const correspondingPet = pets.find(
            (pet) => pet.id === placedItemType.pet
        )
        if (!correspondingPet) {
            return false
        }
        if (correspondingPet.type === pet.type) {
            return true
        }
        return false
    })
    console.log(placedItemTypePets)
    const placedItemPets = placedItems.filter((placedItem) =>
        placedItemTypePets.some(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
    )
    const building = buildings.find(
        (building) => building.kind === BuildingKind.PetHouse
    )
    if (!building) {
        throw new Error(`No building found for pet type: ${pet.type}`)
    }
    const placedItemTypeBuilding = placedItemTypes.find(
        (placedItemType) => placedItemType.building === building.id
    )
    if (!placedItemTypeBuilding) {
        throw new Error(`No placed item type building found for id: ${building.id}`)
    }
    // only one dog house is required
    const placedItemBuilding = placedItems.find(
        (placedItem) => placedItem.placedItemType === placedItemTypeBuilding.id
    )
    if (!placedItemBuilding) {
        return {
            totalLimit: 0,
            totalPlacedItemCount: 0,
        }
    }
    const capacity = 
    building.upgrades?.find(
        (upgrade) =>
            upgrade.upgradeLevel === placedItemBuilding.buildingInfo?.currentUpgrade
    )?.capacity
    if (!capacity) {
        throw new Error(`No capacity found for id: ${placedItemTypeBuilding.id}`)
    }

    return {
        totalLimit: capacity,
        totalPlacedItemCount: placedItemPets.length,
    }
}
