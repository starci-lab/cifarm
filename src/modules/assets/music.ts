import { MusicData } from "./types"

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
                assetUrl: "music/main.mp3",
            },
        },
    },
}
