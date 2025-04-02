import {
    AnimalSchema,
    BuildingKind,
    BuildingSchema,
    CropSchema,
    FlowerSchema,
    FruitInfo,
    FruitSchema,
    PlacedItemSchema,
    PlacedItemType,
    PlacedItemTypeSchema,
    PlantType,
} from "@/modules/entities"
import { CacheKey } from "../types"

export const getTimer = (scene: Phaser.Scene, placedItem: PlacedItemSchema): number => {
    const placedItemTypes = scene.cache.obj.get(
        CacheKey.PlacedItemTypes
    ) as Array<PlacedItemTypeSchema>
    const placedItemType = placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem.placedItemType
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    switch (placedItemType.type) {
    case PlacedItemType.Tile: {
        if (!placedItem.plantInfo) {
            return  0
        }
        let growthStageDuration: number
        switch (placedItem.plantInfo.plantType) {
        case PlantType.Crop: {
            const crops = scene.cache.obj.get(
                CacheKey.Crops
            ) as Array<CropSchema>
            const crop = crops.find(
                (crop) => crop.id === placedItem.plantInfo?.crop
            )
            if (!crop) {
                throw new Error("Crop not found")
            }
            growthStageDuration = crop.growthStageDuration
            break
        }
        case PlantType.Flower: {
            const flowers = scene.cache.obj.get(
                CacheKey.Flowers
            ) as Array<FlowerSchema>
            const flower = flowers.find(
                (flower) => flower.id === placedItem.plantInfo?.flower
            )
            if (!flower) {
                throw new Error("Flower not found")
            }
            growthStageDuration = flower.growthStageDuration
            break
        }
        }
        return growthStageDuration - placedItem.plantInfo.currentStageTimeElapsed
    }
    case PlacedItemType.Building: {
        // only work for bee house
        if (!placedItem.buildingInfo) {
            throw new Error("Building info not found")
        }
        const buildings = scene.cache.obj.get(
            CacheKey.Buildings
        ) as Array<BuildingSchema>
        const building = buildings.find(
            (building) => building.id === placedItemType.building
        )
        if (!building) {
            throw new Error("Building not found")
        }
        switch (building.kind) {
        case BuildingKind.BeeHouse: {
            if (!building.beeHouseYieldTime) {
                throw new Error("Bee house yield time not found")
            }
            if (!placedItem.beeHouseInfo) {
                throw new Error("Bee house info not found")
            }
            return  building.beeHouseYieldTime -
            placedItem.beeHouseInfo.currentYieldTime
        }
        default: {
            return 0
        }
        }
    }
    case PlacedItemType.Animal: {
        if (!placedItem.animalInfo) {
            throw new Error("Animal info not found")
        }
        const placedItemTypes = scene.cache.obj.get(
            CacheKey.PlacedItemTypes
        ) as Array<PlacedItemTypeSchema>
        const placedItemType = placedItemTypes.find(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
        if (!placedItemType) {
            throw new Error("Placed item type not found")
        }
        const animals = scene.cache.obj.get(
            CacheKey.Animals
        ) as Array<AnimalSchema>
        const animal = animals.find(
            (animal) => animal.id === placedItemType.animal
        )
        if (!animal) {
            throw new Error("Animal not found")
        }
        if (placedItem.animalInfo.isAdult) {
            return animal.yieldTime - placedItem.animalInfo.currentYieldTime
        } else {
            return animal.growthTime - placedItem.animalInfo.currentGrowthTime
        }
    }
    case PlacedItemType.Fruit: {
        if (!placedItem.fruitInfo) {
            throw new Error("Fruit info not found")
        }
        const placedItemTypes = scene.cache.obj.get(
            CacheKey.PlacedItemTypes
        ) as Array<PlacedItemTypeSchema>
        const placedItemType = placedItemTypes.find(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
        if (!placedItemType) {
            throw new Error("Placed item type not found")
        }
        const fruits = scene.cache.obj.get(CacheKey.Fruits) as Array<FruitSchema>
        const fruit = fruits.find((fruit) => fruit.id === placedItemType.fruit)
        if (!fruit) {
            throw new Error("Fruit not found")
        }
        const fruitInfo = scene.cache.obj.get(CacheKey.FruitInfo) as FruitInfo
        if (placedItem.fruitInfo.currentStage >= fruitInfo.matureGrowthStage - 1) {
            return fruit.matureGrowthStageDuration -
            placedItem.fruitInfo.currentStageTimeElapsed
        } else {
            return fruit.youngGrowthStageDuration -
              placedItem.fruitInfo.currentStageTimeElapsed
        }
    }
    case PlacedItemType.Pet: {
        // no execution for pet
        return 0
    }
    default: {
        throw new Error("Placed item type not found")
    }
    }
}
