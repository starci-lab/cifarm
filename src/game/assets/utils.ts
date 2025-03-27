import { Scene } from "phaser"
import { SpineConfig, TextureConfig } from "./types"
import { sessionDb } from "@/modules/dexie"


export const loadTexture = async (scene: Scene, textureConfig: TextureConfig) => {
    const { key, assetUrl, useExisting, packageId } = textureConfig
    if (!useExisting) {
        let loaded = true
        if (packageId) {
            const packageLoaded = !!await sessionDb.packages
                .filter((_package) => _package.packageId === packageId)
                .first()
            loaded = !!packageLoaded
        }
        if (loaded) {
            scene.load.image(key, assetUrl)
        }
    }
}

export const loadSpine = async (scene: Scene, spineConfig: SpineConfig) => {
    const { atlas, json, useExisting, packageId } = spineConfig
    if (!useExisting) {
        let loaded = true
        if (packageId) {
            const packageLoaded = !!await sessionDb.packages
                .filter((_package) => _package.packageId === packageId)
                .first()
            loaded = !!packageLoaded
        }
        if (loaded) {
            scene.load.spineAtlas(atlas.key, atlas.assetUrl)
            scene.load.spineJson(json.key, json.assetUrl)
        }
    }
}


