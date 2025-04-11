import { Scene } from "phaser"
import { SceneName } from "../scene"
import { DEFAULT_VOLUME } from "../constants"
import {
    ExternalEventEmitter,
    ExternalEventName,
    UpdateSoundMessage,
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
