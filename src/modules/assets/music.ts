import { MusicData } from "./types"
import { getAssetUrl } from "./utils"

export interface AssetMusicData {
    phaser: {
        base: MusicData
    };
}

export enum MusicId {
    Main = "Main",
}
export const assetMusicMap: Record<MusicId, AssetMusicData> = {
    [MusicId.Main]: {
        phaser: {
            base: {
                assetKey: "music-main",
                assetUrl: getAssetUrl("/music/main.mp3"),
            },
        },
    },
}
