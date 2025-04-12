import { sessionDb } from "@/modules/dexie"
import axios from "axios"
import { DownloadData } from "@/redux"
import { AssetTextureData } from "@/modules/assets"

export const getBytes = async (textureConfigs: Array<AssetTextureData>): Promise<Record<string, number>> => {
    const bytesMap: Record<string, number> = {}
    const promises: Array<Promise<void>> = []
    for (const textureConfig of textureConfigs) {
        const { assetUrl } = textureConfig
        if (!assetUrl) throw new Error("Asset URL is required")
        promises.push(
            (async () => {
                const { headers } = await axios.head(assetUrl, {
                    responseType: "blob",
                })
                const bytes = headers["content-length"]
                bytesMap[textureConfig.assetKey] = Number(bytes)
            })()
        )
    }
    await Promise.all(promises)
    return bytesMap    
}

export const downloadTexture = async (
    assetData: AssetTextureData,
    onDownloadProgress: (key: string, data: DownloadData) => void,  
) => {
    const { assetKey, assetUrl, version = 0 } = assetData
    if (!assetUrl) throw new Error("Asset URL is required")
    const { data } = await axios.get(assetUrl, {
        responseType: "blob",
        onDownloadProgress: (progress) => {
            onDownloadProgress(assetKey, { progress: progress.progress ?? 0 })
        },
    })
    await sessionDb.assets.put({ data, version, key: assetKey })
    return data
}
