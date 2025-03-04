import { AUTO, Game } from "phaser"
import { BootstrapScene, LoadingScene, GameplayScene, UIScene } from "./scenes"
import { CONTAINER_ID } from "./constants"
import GesturesPlugin from "phaser3-rex-plugins/plugins/gestures-plugin.js"
import MouseWheelScrollerPlugin from "phaser3-rex-plugins/plugins/mousewheelscroller-plugin.js"
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js"
import { DataScene } from "./scenes/DataScene"
import CircleMaskImagePlugin from "phaser3-rex-plugins/plugins/circlemaskimage-plugin.js"

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    parent: CONTAINER_ID,
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 1920,
    },
    dom: {
        createContainer: true
    },
    plugins: {
        global: [{
            key: "rexCircleMaskImagePlugin",
            plugin: CircleMaskImagePlugin,
            start: true
        },
        // ...
        ],
        scene: [
            //add rexGestures plugin
            {
                key: "rexGestures",
                plugin: GesturesPlugin,
                mapping: "rexGestures",
            },
            //add MouseWheelScroller plugin
            {
                key: "rexMouseWheelScroller",
                plugin: MouseWheelScrollerPlugin,
                mapping: "rexMouseWheelScroller",
            },
            //add UI plugin
            {
                key: "rexUI",
                plugin: UIPlugin,
                mapping: "rexUI",
            }
        ],
    },
    scene: [BootstrapScene, LoadingScene, GameplayScene, UIScene, DataScene],
}

export const startGame = (parent?: string) => {
    if (parent) {
        config.parent = parent
    }
    return new Game(config)
}
