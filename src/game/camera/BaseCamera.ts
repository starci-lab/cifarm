import { Scene } from "phaser"

export class BaseCamera {
    private scene: Scene

    constructor(scene: Scene) {
        this.scene = scene
        // enable camera movement
        const camera = this.scene.cameras.main
        this.scene.input.on("pointermove", (pE: PointerEvent) => {
            camera.scrollX += pE.movementX / camera.zoom
            camera.scrollY += pE.movementY / camera.zoom
        }, this.scene)
    }
}
