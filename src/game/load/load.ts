import { Scene } from "phaser"
import { AssetTextureData, AssetSpineData, FontData, MusicData } from "@/modules/assets"
import { sessionDb } from "@/modules/dexie"
import axios from "axios"
import { CacheKey } from "../types"
import { ExternalEventEmitter, ExternalEventName } from "../events"
export const PATH = "assets"

export const downloadTexture = async (
    scene: Scene,
    textureData: AssetTextureData
) => {
    // increment the total assets loaded
    const totalAssetsLoaded = Number.parseInt(
        scene.cache.obj.get(CacheKey.TotalAssetsLoaded) ?? 0
    )
    scene.cache.obj.add(CacheKey.TotalAssetsLoaded, totalAssetsLoaded + 1)

    const { assetKey, assetUrl, version = 0 } = textureData
    if (!assetUrl) throw new Error("Asset URL is required")

    const asset = await sessionDb.assets
        .filter((asset) => asset.key === assetKey)
        .first()
    if (asset && asset.version === version) {
        ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, 1)
        return asset.data
    }
    const { data } = await axios.get(assetUrl, {
        responseType: "blob",
        onDownloadProgress: (progress) => {
            if (progress.progress) {
                ExternalEventEmitter.emit(
                    ExternalEventName.AssetsLoaded,
                    progress.progress
                )
            }
        },
    })
    await sessionDb.assets.add({ key: assetKey, data, version })
    return data
}

export const loadTexture = async (
    scene: Scene,
    textureData: AssetTextureData
) => {
    try {
        const { assetKey, useExisting, packageId } = textureData
        if (!useExisting) {
            let loaded = true
            if (packageId) {
                const packageLoaded = !!(await sessionDb.packages
                    .filter((_package) => _package.packageId === packageId)
                    .first())
                loaded = !!packageLoaded
            }
            if (loaded) {
                const blob = await downloadTexture(scene, textureData)
                scene.load.image(assetKey, URL.createObjectURL(blob))
            }
        }
    } catch (error) {
        console.error(error)
    }
}

export const downloadJson = async (scene: Scene, spineData: AssetSpineData) => {
    // increment the total assets loaded
    const totalAssetsLoaded = Number.parseInt(
        scene.cache.obj.get(CacheKey.TotalAssetsLoaded) ?? 0
    )
    scene.cache.obj.add(CacheKey.TotalAssetsLoaded, totalAssetsLoaded + 1)

    const { assetUrl, version = 0, assetKey } = spineData.json
    if (!assetUrl) throw new Error("Asset URL is required")

    const asset = await sessionDb.assets
        .filter((asset) => asset.key === assetKey)
        .first()
    if (asset) {
        ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, 1)
        return asset.data
    }
    const { data } = await axios.get(assetUrl, {
        responseType: "blob",
        onDownloadProgress: (progress) => {
            ExternalEventEmitter.emit(
                ExternalEventName.AssetsLoaded,
                progress.progress
            )
        },
    })
    await sessionDb.assets.add({ key: assetKey, data, version })
    return data
}

export const downloadAtlas = async (scene: Scene, spineData: AssetSpineData) => {
    // increment the total assets loaded
    const totalAssetsLoaded = Number.parseInt(
        scene.cache.obj.get(CacheKey.TotalAssetsLoaded) ?? 0
    )
    scene.cache.obj.add(CacheKey.TotalAssetsLoaded, totalAssetsLoaded + 2)

    const {
        assetKey,
        assetUrl,
        textureUrl,
        version = 0,
    } = spineData.atlas
    if (!textureUrl) throw new Error("Texture URL is required")

    let textureData: Blob
    const textureKey = `${assetKey}-texture`
    const textureAsset = await sessionDb.assets
        .filter((asset) => asset.key === textureKey)
        .first()
    if (textureAsset && textureAsset.version === version) {
        ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, 1)
        textureData = textureAsset.data
    } else {
        const { data } = await axios.get(textureUrl, {
            responseType: "blob",
            onDownloadProgress: (progress) => {
                ExternalEventEmitter.emit(
                    ExternalEventName.AssetsLoaded,
                    progress.progress
                )
            },
        })
        await sessionDb.assets.add({ key: textureKey, data, version })
        textureData = data
    }

    if (!assetUrl) throw new Error("Asset URL is required")

    let atlasText: string
    const asset = await sessionDb.assets
        .filter((asset) => asset.key === assetKey)
        .first()
    if (asset && asset.version === version) {
        ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, 1)
        atlasText = await asset.data.text()
    } else {
        const { data } = await axios.get(assetUrl, {
            responseType: "text",
            onDownloadProgress: (progress) => {
                ExternalEventEmitter.emit(
                    ExternalEventName.AssetsLoaded,
                    progress.progress
                )
            },
        })
        const _atlasBlob = new Blob([data], {
            type: "blob",
        })
        await sessionDb.assets.add({ key: assetKey, data: _atlasBlob, version })
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
    return _atlasBlob
}

export const loadSpine = async (scene: Scene, spineData: AssetSpineData) => {
    try {
        const { atlas, json, useExisting, packageId } = spineData
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
                    downloadAtlas(scene, spineData),
                    downloadJson(scene, spineData),
                ])
                scene.load.spineAtlas(atlas.assetKey, URL.createObjectURL(atlasBlob))
                scene.load.spineJson(json.assetKey, URL.createObjectURL(jsonBlob))
            }
        }
    } catch (error) {
        console.error(error)
    }
}

export const getBlobUrlByKey = async (textureData: AssetTextureData) => {
    const { assetKey } = textureData
    const textureAsset = await sessionDb.assets
        .filter((asset) => asset.key === assetKey)
        .first()
    if (textureAsset) {
        return URL.createObjectURL(textureAsset.data)
    }
    return null
}

export const downloadFont = async (scene: Scene, fontData: FontData) => {
    // increment the total assets loaded
    const totalAssetsLoaded = Number.parseInt(
        scene.cache.obj.get(CacheKey.TotalAssetsLoaded) ?? 0
    )
    scene.cache.obj.add(CacheKey.TotalAssetsLoaded, totalAssetsLoaded + 1)

    const { assetKey, assetUrl, version = 0 } = fontData
    if (!assetUrl) throw new Error("Asset URL is required")

    const asset = await sessionDb.assets
        .filter((asset) => asset.key === assetKey)
        .first()
    if (asset && asset.version === version) {
        ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, 1)
        return asset.data
    }
    const { data } = await axios.get(assetUrl, {
        responseType: "blob",
        onDownloadProgress: (progress) => {
            if (progress.progress) {
                ExternalEventEmitter.emit(
                    ExternalEventName.AssetsLoaded,
                    progress.progress
                )
            }
        },
    })
    await sessionDb.assets.add({ key: assetKey, data, version })
    return data
}

export const loadFont = async (scene: Scene, fontData: FontData) => {
    const fontBlob = await downloadFont(scene, fontData)
    scene.load.font(fontData.assetKey, URL.createObjectURL(fontBlob))
}

export const downloadMusic = async (scene: Scene, musicData: MusicData) => {
    const { assetKey, assetUrl, version = 0 } = musicData
    if (!assetUrl) throw new Error("Asset URL is required")

    const asset = await sessionDb.assets
        .filter((asset) => asset.key === assetKey)
        .first()
    if (asset && asset.version === version) {
        ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, 1)
        return asset.data
    }
    const { data } = await axios.get(assetUrl, {
        responseType: "blob",
        onDownloadProgress: (progress) => {
            ExternalEventEmitter.emit(ExternalEventName.AssetsLoaded, progress.progress)
        },
    })
    await sessionDb.assets.add({ key: assetKey, data, version })
    return data
}

export const loadMusic = async (scene: Scene, musicData: MusicData) => {
    const musicBlob = await downloadMusic(scene, musicData)
    scene.load.audio(musicData.assetKey, URL.createObjectURL(musicBlob))
}


