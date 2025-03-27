import { sessionDb } from "@/modules/dexie"
import { Scene } from "phaser"

export interface FetchAssetParams {
    key: string 
    assetUrl: string
    packageId?: number
    scene: Scene
    type?: "image" | "atlas" | "json"
}

export const fetchAsset = async ({ key, assetUrl, packageId, scene, type = "image" }: FetchAssetParams) => {
    // check if the asset is stored in dexie
    const asset = await sessionDb.assets.where("key").equals(key).first()
    let blobUrl = ""
    // if asset is already stored in dexie, we will use the asset from dexie
    if (asset) {
        blobUrl = URL.createObjectURL(new Blob([asset.data]))
        scene.load.image(key, blobUrl)
        return
    }
    // if packageId is not set, mean that the asset is the default asset, so we will load first time
    // other assets will be download manually
    if (!packageId) {
        const res = await fetch(assetUrl)
        const blob = await res.blob()
        // save the asset to dexie
        await sessionDb.assets.add({
            key,
            data: blob,
        })
        blobUrl = URL.createObjectURL(blob)
        switch (type) {
        case "image":
            scene.load.image(key, blobUrl)
            break
        case "atlas":
            scene.load.atlas(key, assetUrl, assetUrl)
            break
        case "json":
            scene.load.json(key, assetUrl)
            break
        }
    }
}