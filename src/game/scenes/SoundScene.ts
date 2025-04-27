import { Scene } from "phaser"
import { SceneName } from "../scene"
import { DEFAULT_VOLUME } from "../constants"
import {
    ExternalEventEmitter,
    ExternalEventName,
    UpdateSoundMessage,
} from "@/modules/event-emitter"
import { loadMusicAssets } from "../load"
import { assetMusicMap } from "@/modules/assets"
import { MusicId } from "@/modules/assets"

export class SoundScene extends Scene {
    constructor() {
        super(SceneName.Sound)
    }

    async create() {
        await loadMusicAssets(this)
        this.load.on("complete", () => {
            const audio = this.sound.add(assetMusicMap[MusicId.Main].phaser.base.assetKey, {
                loop: true,
                volume: DEFAULT_VOLUME,
            })
            audio.play()
            ExternalEventEmitter.on(
                ExternalEventName.UpdateSound,
                ({ value }: UpdateSoundMessage) => {
                    audio.setVolume(value)
                }
            )
        })
        this.load.start()
    }
}
