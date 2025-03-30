import { Scene } from "phaser"
import { SpineConfig, TextureConfig } from "./types"
import { sessionDb } from "@/modules/dexie"
import axios from "axios"
import { CacheKey } from "../types"
import { ExternalEventEmitter, ExternalEventName } from "../events"
//export const BASE_URL = "https://cifarm.s3.ap-southeast-1.amazonaws.com/"
//export const BASE_URL = "http://localhost:3000/"
export const PATH = "assets"

export const getAssetUrl = (assetUrl: string) => {
    return `${PATH}/${assetUrl}`
}
export const downloadTexture = async (
    scene: Scene,
    textureConfig: TextureConfig
) => {
    // increment the total assets loaded
    const totalAssetsLoaded = Number.parseInt(scene.cache.obj.get(CacheKey.TotalAssetsLoaded) ?? 0) 
    scene.cache.obj.add(CacheKey.TotalAssetsLoaded, totalAssetsLoaded + 1)

    const { key, assetUrl, version = 0 } = textureConfig
    if (!assetUrl) throw new Error("Asset URL is required")

    const asset = await sessionDb.assets
        .filter((asset) => asset.key === key)
        .first()
    if (asset && asset.version === version) {
        ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, 1)
        return asset.data
    }
    const url = getAssetUrl(assetUrl)
    const { data } = await axios.get(url, {
        responseType: "blob",
        onDownloadProgress: (progress) => {
            console.log(url, progress.progress)
            if (progress.progress) {
                ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, progress.progress)
            }
        },
    })
    await sessionDb.assets.add({ key, data, version })
    return data
}

export const loadTexture = async (
    scene: Scene,
    textureConfig: TextureConfig
) => {
    try {
        const { key, useExisting, packageId } = textureConfig
        if (!useExisting) {
            let loaded = true
            if (packageId) {
                const packageLoaded = !!(await sessionDb.packages
                    .filter((_package) => _package.packageId === packageId)
                    .first())
                loaded = !!packageLoaded
            }
            if (loaded) {
                const blob = await downloadTexture(scene, textureConfig)
                scene.load.image(key, URL.createObjectURL(blob))
            }
        }
    } catch (error) {
        console.error(error)
    }
}

export const downloadJson = async (scene: Scene, spineConfig: SpineConfig) => {
    // increment the total assets loaded
    const totalAssetsLoaded = Number.parseInt(scene.cache.obj.get(CacheKey.TotalAssetsLoaded) ?? 0) 
    scene.cache.obj.add(CacheKey.TotalAssetsLoaded, totalAssetsLoaded + 1)

    const { key, assetUrl, version = 0 } = spineConfig.json
    if (!assetUrl) throw new Error("Asset URL is required")

    const asset = await sessionDb.assets
        .filter((asset) => asset.key === key)
        .first()
    if (asset) {
        ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, 1)
        return asset.data
    }
    const { data } = await axios.get(getAssetUrl(assetUrl), {
        responseType: "blob",
        onDownloadProgress: (progress) => {
            ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, progress.progress)
        },
    })
    await sessionDb.assets.add({ key, data, version })
    return data
}

export const downloadAtlas = async (scene: Scene, spineConfig: SpineConfig) => {
    // increment the total assets loaded
    const totalAssetsLoaded = Number.parseInt(scene.cache.obj.get(CacheKey.TotalAssetsLoaded) ?? 0) 
    scene.cache.obj.add(CacheKey.TotalAssetsLoaded, totalAssetsLoaded + 2)

    const {
        atlas: { key, assetUrl, textureUrl, version = 0 },
    } = spineConfig
    if (!textureUrl) throw new Error("Texture URL is required")

    let textureData: Blob
    const textureKey = `${key}-texture`
    const textureAsset = await sessionDb.assets
        .filter((asset) => asset.key === textureKey)
        .first()
    if (textureAsset && textureAsset.version === version) {
        ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, 1)
        textureData = textureAsset.data
    } else {
        const { data } = await axios.get(getAssetUrl(textureUrl), {
            responseType: "blob",
            onDownloadProgress: (progress) => {
                ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, progress.progress)
            },
        })
        await sessionDb.assets.add({ key: textureKey, data, version })
        textureData = data
    }

    if (!assetUrl) throw new Error("Asset URL is required")

    let atlasText: string
    const asset = await sessionDb.assets
        .filter((asset) => asset.key === key)
        .first()
    if (asset) {
        ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, 1)
        atlasText = await asset.data.text()
    } else {
        const { data } = await axios.get(getAssetUrl(assetUrl), {
            responseType: "text",
            onDownloadProgress: (progress) => {
                ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, progress.progress)
            },
        })
        atlasText = data
    }
    // alter the first line of the atlas to the texture guid
    const atlasTextLines = atlasText.split("\n")
    const textureBlobUrl = URL.createObjectURL(textureData)
    const textureGuid = textureBlobUrl.split("/").pop() ?? ""
    atlasTextLines[0] = textureGuid
    const _atlasBlob = new Blob([atlasTextLines.join("\n")], {
        type: "blob",
    })
    await sessionDb.assets.add({ key, data: _atlasBlob, version })
    return _atlasBlob
}

export const loadSpine = async (scene: Scene, spineConfig: SpineConfig) => {
    try {
        const { atlas, json, useExisting, packageId } = spineConfig
        if (!useExisting) {
            let loaded = true
            if (packageId) {
                const packageLoaded = !!(await sessionDb.packages
                    .filter((_package) => _package.packageId === packageId)
                    .first())
                loaded = !!packageLoaded
            }
            if (loaded) {
                const [atlasBlob, jsonBlob] = await Promise.all([
                    downloadAtlas(scene, spineConfig),
                    downloadJson(scene, spineConfig),
                ])
                scene.load.spineAtlas(atlas.key, URL.createObjectURL(atlasBlob))
                scene.load.spineJson(json.key, URL.createObjectURL(jsonBlob))
            }
        }
    } catch (error) {
        console.error(error)
    }
}
