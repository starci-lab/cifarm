/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scene } from "phaser"

// This is the abstract class that all non-UI scenes will extend
export abstract class SceneAbstract {
    protected scene: Scene
    // Center position, helpful for positioning UI elements
    protected centerX: number
    protected centerY: number

    protected leftX: number
    protected rightX: number

    protected topY: number
    protected bottomY: number

    //any additional arguments that the class may need
    protected args: any[]

    constructor(scene: Scene, ...args: any[]) {
        this.scene = scene
        const { width, height } = this.scene.game.scale
        
        this.centerX = width / 2
        this.centerY = height / 2

        this.leftX = 0
        this.rightX = width

        this.topY = 0
        this.bottomY = height

        this.args = args
    }
}