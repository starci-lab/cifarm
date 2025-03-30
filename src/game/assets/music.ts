import { sessionDb } from "@/modules/dexie"
import axios from "axios"
import { Scene } from "phaser"
import { getAssetUrl } from "./utils"

export interface MusicConfig {
  key: string;
  assetUrl: string;
  version?: number;
}

const BASE_MUSIC_URL = "music"

export enum MusicKey {
  Background = "background-music",
}
export const musicConfig: Record<string, MusicConfig> = {
    [MusicKey.Background]: {
        key: MusicKey.Background,
        assetUrl: "background.mp3",
    },
}

export const downloadMusic = async ({
    key,
    assetUrl,
    version = 0,
}: MusicConfig) => {
    const asset = await sessionDb.assets
        .filter((asset) => asset.key === key)
        .first()
    if (asset && asset.version === version) {
        return asset.data
    }
    const { data } = await axios.get(
        getAssetUrl(`${BASE_MUSIC_URL}/${assetUrl}`),
        {
            responseType: "blob",
        }
    )
    await sessionDb.assets.add({ key, data, version })
    return data
}

export const loadMusic = async (scene: Scene) => {
    const promises: Array<Promise<void>> = []
    for (const music of Object.values(musicConfig)) {
        promises.push(
            (async () => {
                const musicData = await downloadMusic(music)
                scene.load.audio(music.key, URL.createObjectURL(musicData))
            })()
        )
    }
    await Promise.all(promises)
}
