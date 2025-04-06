import { getAssetUrl } from "@/game/assets/utils"
import { TextureConfig } from "@/game/assets"
import { sessionDb } from "@/modules/dexie"
import axios from "axios"
import { DownloadData } from "@/redux"
export const getBytes = async (textureConfigs: Array<TextureConfig>): Promise<Record<string, number>> => {
    const bytesMap: Record<string, number> = {}
    const promises: Array<Promise<void>> = []
    for (const textureConfig of textureConfigs) {
        const { assetUrl } = textureConfig
        if (!assetUrl) throw new Error("Asset URL is required")
        const url = getAssetUrl(assetUrl)
        promises.push(
            (async () => {
                const { headers } = await axios.head(url, {
                    responseType: "blob",
                })
                const bytes = headers["content-length"]
                bytesMap[textureConfig.key] = Number(bytes)
            })()
        )
    }
    await Promise.all(promises)
    return bytesMap    
}

export const downloadTexture = async (
    textureConfig: TextureConfig,
    onDownloadProgress: (key: string, data: DownloadData) => void,  
) => {
    const { key, assetUrl, version = 0 } = textureConfig
    if (!assetUrl) throw new Error("Asset URL is required")
    const url = getAssetUrl(assetUrl)
    const { data } = await axios.get(url, {
        responseType: "blob",
        onDownloadProgress: (progress) => {
            onDownloadProgress(key, { progress: progress.progress ?? 0 })
        },
    })
    await sessionDb.assets.put({ data, version, key })
    return data
}
