import { 
    assetAnimalMap, 
    assetStateMap,
    AssetMapType, 
    assetFlowerMap,
    assetBuildingMap,
    assetProductMap,
    assetTileMap,
    assetPetMap,
    assetFruitMap,
    AssetBuildingData,
    AssetTileData,
    AssetPetData,
    AssetFruitData,
    assetFontMap,
    assetMusicMap,
    assetCropMap,
    assetBootstrapMap,
    assetMiscMap,
    assetIconMap,
} from "@/modules/assets"
import { Scene } from "phaser"
import { loadFont, loadMusic, loadSpine, loadTexture } from "./load"

export const loadAnimalAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const animalData of Object.values(assetAnimalMap)) {
        for (const ageData of Object.values(animalData.phaser.map.ages)) {
            switch (ageData.type) {
            case AssetMapType.Spine: {
                if (!ageData.spine) {
                    throw new Error("Spine config is undefined")
                }
                promises.push(loadSpine(scene, ageData.spine))
                break
            }
            default: {
                if (!ageData.texture) {
                    throw new Error("Texture config is undefined")
                }
                promises.push(loadTexture(scene, ageData.texture))
                break
            }
            }
        }
    }
    await Promise.all(promises)
}

export const loadFlowerAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const flowerData of Object.values(assetFlowerMap)) {
        for (const stageData of Object.values(flowerData.phaser.map.stages)) {
            switch (stageData.type) {
            case AssetMapType.Spine: {
                if (!stageData.spine) {
                    throw new Error("Spine config is undefined")
                }
                promises.push(loadSpine(scene, stageData.spine))
                break
            }
            default: {
                if (!stageData.texture) {
                    throw new Error("Texture config is undefined")
                }
                promises.push(loadTexture(scene, stageData.texture))
                break
            }
            }
        }
    }
    await Promise.all(promises)
}

export const loadBuildingAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const buildingData of Object.values(assetBuildingMap) as AssetBuildingData[]) {
        switch (buildingData.phaser.map.type) {
        case AssetMapType.Spine: {
            if (!buildingData.phaser.map.spine) {
                throw new Error("Spine config is undefined")
            }
            promises.push(loadSpine(scene, buildingData.phaser.map.spine))
            break
        }
        default: {
            if (!buildingData.phaser.map.texture) {
                throw new Error("Texture config is undefined")
            }
            promises.push(loadTexture(scene, buildingData.phaser.map.texture))
            break
        }
        }
    }
    await Promise.all(promises)
}

export const loadProductAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const productData of Object.values(assetProductMap)) {
        promises.push(loadTexture(scene, productData.phaser.base))
    }
    await Promise.all(promises)
}

export const loadTileAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const tileData of Object.values(assetTileMap) as AssetTileData[]) {
        switch (tileData.phaser.map.type) {
        case AssetMapType.Spine: {
            if (!tileData.phaser.map.spine) {
                throw new Error("Spine config is undefined")
            }
            promises.push(loadSpine(scene, tileData.phaser.map.spine))
            break
        }
        default: {
            if (!tileData.phaser.map.texture) {
                throw new Error("Texture config is undefined")
            }
            promises.push(loadTexture(scene, tileData.phaser.map.texture))
            break
        }
        }
    }
    await Promise.all(promises)
}

export const loadPetAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const petData of Object.values(assetPetMap) as AssetPetData[]) {
        switch (petData.phaser.map.type) {
        case AssetMapType.Spine: {
            if (!petData.phaser.map.spine) {
                throw new Error("Spine config is undefined")
            }
            promises.push(loadSpine(scene, petData.phaser.map.spine))
            break
        }
        default: {
            if (!petData.phaser.map.texture) {
                throw new Error("Texture config is undefined")
            }
            promises.push(loadTexture(scene, petData.phaser.map.texture))
            break
        }
        }
    }
    await Promise.all(promises)
}

export const loadFruitAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const fruitData of Object.values(assetFruitMap) as AssetFruitData[]) {
        for (const stageData of Object.values(fruitData.phaser.map.stages)) {
            switch (stageData.type) {
            case AssetMapType.Spine: {
                if (!stageData.spine) {
                    throw new Error("Spine config is undefined")
                }
                promises.push(loadSpine(scene, stageData.spine))
                break
            }
            default: {
                if (!stageData.texture) {
                    throw new Error("Texture config is undefined")
                }
                promises.push(loadTexture(scene, stageData.texture))
                break
            }
            }
        }
    }
    await Promise.all(promises)
}

export const loadStateAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const stateData of Object.values(assetStateMap.animal)) {
        if (!stateData.phaser.base) {
            throw new Error("Texture config is undefined")
        }
        promises.push(loadTexture(scene, stateData.phaser.base))
    }
    for (const stateData of Object.values(assetStateMap.fruit)) {
        if (!stateData.phaser.base) {
            throw new Error("Texture config is undefined")
        }
        promises.push(loadTexture(scene, stateData.phaser.base))
    }   
    for (const stateData of Object.values(assetStateMap.plant)) {
        if (!stateData.phaser.base) {
            throw new Error("Texture config is undefined")
        }
        promises.push(loadTexture(scene, stateData.phaser.base))
    }
    await Promise.all(promises)
}

export const loadFontAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const fontData of Object.values(assetFontMap)) {
        promises.push(loadFont(scene, fontData.phaser.base))
    }
    await Promise.all(promises)
}

export const loadMusicAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const musicData of Object.values(assetMusicMap)) {
        promises.push(loadMusic(scene, musicData.phaser.base))
    }
    await Promise.all(promises)
}

export const loadCropAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const cropData of Object.values(assetCropMap)) {
        for (const stageData of Object.values(cropData.phaser.map.stages)) {
            switch (stageData.type) {
            case AssetMapType.Spine: {
                if (!stageData.spine) {
                    throw new Error("Spine config is undefined")
                }
                promises.push(loadSpine(scene, stageData.spine))
                break
            }
            default: {
                if (!stageData.texture) {
                    throw new Error("Texture config is undefined")
                }
                promises.push(loadTexture(scene, stageData.texture))
                break
            }
            }
        }
    }
    await Promise.all(promises)
}

export const loadBootstrapAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const bootstrapData of Object.values(assetBootstrapMap)) {
        if (!bootstrapData.phaser.base) {
            throw new Error("Texture config is undefined")
        }
        promises.push(loadTexture(scene, bootstrapData.phaser.base))
    }
    await Promise.all(promises)
}

export const loadMiscAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const miscData of Object.values(assetMiscMap)) {
        promises.push(loadTexture(scene, miscData.phaser.base))
    }
    await Promise.all(promises)
}

export const loadIconAssets = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const iconData of Object.values(assetIconMap)) {
        if (iconData.phaser?.base) {
            promises.push(loadTexture(scene, iconData.phaser.base))
        }
    }
    await Promise.all(promises)
}
