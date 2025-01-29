import { AUTO, Game } from "phaser"
import { Bootstrap, LoadingScene } from "./scenes"
import { CONTAINER_ID } from "./constants"

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    parent: CONTAINER_ID,
    backgroundColor: "#028af8",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 1920
    },
    scene: [
        Bootstrap,
        LoadingScene,
    ]
}

export const startGame = (parent?: string) => {
    if (parent)
    {
        config.parent = parent
    }
    return new Game(config)
}