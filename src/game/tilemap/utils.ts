import { SpineGameObject } from "@esotericsoftware/spine-phaser"
import {
    MainVisualType,
    MapAssetData,
    tileAssetMap,
    buildingAssetMap,
    animalAssetMap,
    fruitAssetMap,
    AnimalAge,
} from "../assets"
import {
    AnimalSchema,
    BuildingSchema,
    FruitSchema,
    PlacedItemType,
    PlacedItemTypeSchema,
    TileSchema,
} from "@/modules/entities"
import { CacheKey } from "../types"

export const setTintForMainVisual = (
    mainVisual: Phaser.GameObjects.Sprite | SpineGameObject,
    tintColor: number
) => {
    if (mainVisual) {
        if (mainVisual instanceof Phaser.GameObjects.Sprite) {
            mainVisual.setTint(tintColor)
        } else if (mainVisual instanceof SpineGameObject) {
            const r = ((tintColor >> 16) & 0xff) / 255
            const g = ((tintColor >> 8) & 0xff) / 255
            const b = (tintColor & 0xff) / 255

            mainVisual.skeleton.slots.forEach((slot) => {
                slot.color.set(r, g, b, 1)
            })
        }
    }
}

export const clearTintForMainVisual = (
    mainVisual: Phaser.GameObjects.Sprite | SpineGameObject
) => {
    if (mainVisual) {
        if (mainVisual instanceof Phaser.GameObjects.Sprite) {
            mainVisual.clearTint()
        } else if (mainVisual instanceof SpineGameObject) {
            mainVisual.skeleton.slots.forEach((slot) => {
                slot.color.set(1, 1, 1, 1)
            })
        }
    }
}

export interface CreateMainVisualParams extends MapAssetData {
  scene: Phaser.Scene;
}

export type GetMainVisualOffsetsParams = MapAssetData
export const getMainVisualOffsets = (
    { mainVisualType, spineConfig, textureConfig }: GetMainVisualOffsetsParams
) => {
    let x = 0
    let y = 0
    switch (mainVisualType) {
    case MainVisualType.Spine: {
        const { x: extraX = 0, y: extraY = 0 } = { ...spineConfig?.extraOffsets }
        x = extraX
        y = extraY
        break
    }
    default: {
        const { x: extraX = 0, y: extraY = 0 } = {
            ...textureConfig?.extraOffsets,
        }
        x = extraX
        y = extraY
        break
    }
    }

    return { x, y }
}

export const createMainVisual = ({
    mainVisualType = MainVisualType.Sprite,
    textureConfig,
    spineConfig,
    scene,
}: CreateMainVisualParams) => {
    let mainVisual: Phaser.GameObjects.Sprite | SpineGameObject | undefined
    switch (mainVisualType) {
    case MainVisualType.Spine: {
        if (!spineConfig) {
            throw new Error("Spine config is undefined")
        }
        //render spine animation
        mainVisual = scene.add
            .spine(0, 0, spineConfig.json.key, spineConfig.atlas.key)
            .setOrigin(0.5, 1)
        mainVisual.animationState.setAnimation(0, "idle", true)
        return mainVisual
    }
    default: {
        if (!textureConfig) {
            throw new Error("Texture config is undefined")
        }
        //render sprite
        return scene.add.sprite(0, 0, textureConfig.key).setOrigin(0.5, 1)
    }
    }
}

export interface GetAssetDataParams {
  placedItemType: PlacedItemTypeSchema;
  scene: Phaser.Scene;
  // extra vars to be use to define the asset data
  isAdult?: boolean;
  fruitStage?: number;
}

export const getAssetData = ({
    placedItemType,
    scene,
    isAdult,
    fruitStage,
}: GetAssetDataParams): MapAssetData | undefined => {
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    switch (placedItemType.type) {
    case PlacedItemType.Tile: {
        if (!placedItemType.tile) {
            throw new Error("Tile ID not found")
        }
        const tiles = scene.cache.obj.get(CacheKey.Tiles) as Array<TileSchema>
        const tile = tiles.find((tile) => tile.id === placedItemType.tile)
        if (!tile) {
            throw new Error("Tile not found")
        }
        return tileAssetMap[tile.displayId].map
    }
    case PlacedItemType.Building: {
        if (!placedItemType.building) {
            throw new Error("Building ID not found")
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
        return buildingAssetMap[building.displayId].map
    }
    case PlacedItemType.Animal: {
        if (!placedItemType.animal) {
            throw new Error("Animal ID not found")
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
        const age = isAdult ? AnimalAge.Adult : AnimalAge.Baby
        return animalAssetMap[animal.displayId].map[age]
    }
    case PlacedItemType.Fruit: {
        if (!placedItemType.fruit) {
            throw new Error("Fruit ID not found")
        }
        const fruits = scene.cache.obj.get(CacheKey.Fruits) as Array<FruitSchema>
        const fruit = fruits.find((fruit) => fruit.id === placedItemType.fruit)
        if (!fruit) {
            throw new Error("Fruit not found")
        }
        return fruitAssetMap[fruit.displayId].map[fruitStage ?? 0]
    }
    }
}
