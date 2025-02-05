import { Scene } from "phaser"
import { SceneName } from "../scene"

export class DataScene extends Scene {
    constructor() {
        super(SceneName.Data)
    }

    init() {
        console.log("DataScene: init")
    }
}
