/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scene } from "phaser"

// This is the abstract class that all non-UI scenes will extend
export abstract class SceneAbstract {
    protected scene: Scene
    // Center position, helpful for positioning UI elements

    //any additional arguments that the class may need
    protected args: any[]

    constructor(scene: Scene, ...args: any[]) {
        this.scene = scene
        this.args = args
    }
}