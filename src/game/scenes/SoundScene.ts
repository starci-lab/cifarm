import { Scene } from "phaser"
import { SceneName } from "../scene"
import { DEFAULT_VOLUME } from "../constants"
import {
    SceneEventEmitter,
    SceneEventName,
    UpdateVolumeMessage,
} from "../events"
import { loadMusic, MusicKey } from "../assets"

export class SoundScene extends Scene {
    constructor() {
        super(SceneName.Sound)
    }

    async create() {
        await loadMusic(this)
        this.load.on("complete", () => {
            const audio = this.sound.add(MusicKey.Background, {
                loop: true,
                volume: DEFAULT_VOLUME,
            })
            audio.play()
            SceneEventEmitter.on(
                SceneEventName.UpdateVolume,
                ({ volume }: UpdateVolumeMessage) => {
                    audio.setVolume(volume)
                }
            )
        })
        this.load.start()
    }
}
