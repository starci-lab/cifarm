import { Scene } from "phaser"
import { SceneName } from "../scene"
import { AUDIO_GAME_MUSIC, DEFAULT_VOLUME } from "../constants"
import { SceneEventEmitter, SceneEventName, UpdateVolumeMessage } from "../events"

export class SoundScene extends Scene {
    constructor() {
        super(SceneName.Sound)
    }

    preload() {
        this.load.audio(AUDIO_GAME_MUSIC, "audio/game-music.mp3")
    }

    create() {
        const audio = this.sound.add(AUDIO_GAME_MUSIC, { loop: true, volume: DEFAULT_VOLUME })
        audio.play()
        SceneEventEmitter.on(SceneEventName.UpdateVolume, ({ volume }: UpdateVolumeMessage) => {
            audio.setVolume(volume)
        })
    }
}
