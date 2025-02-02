import { Scene } from "phaser"
import { Pinch } from "phaser3-rex-plugins/plugins/gestures.js"
import { PinchBaseConstructorParams } from "../types"

export class PinchInput extends Pinch {
    private scene: Scene
    constructor({ scene }: PinchBaseConstructorParams) {
        super(scene, {
            enable: true
        })

        this.scene = scene

        const camera = this.scene.cameras.main

        this.on("drag1", (dragScale: Pinch) => {
            const drag1Vector = dragScale.drag1Vector
            camera.scrollX -= drag1Vector.x / camera.zoom
            camera.scrollY -= drag1Vector.y / camera.zoom
        })
            .on("pinch", (dragScale: Pinch) => {
                const scaleFactor = dragScale.scaleFactor
                camera.zoom *= scaleFactor
            })
    }
}