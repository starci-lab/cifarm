import { Scene } from "phaser"

export class MouseInput {
    private scene: Scene
    constructor(scene: Scene) {
        this.scene = scene

        // const camera = this.scene.cameras.main
        // this.scene.input.on(
        //     "wheel",
        //     (
        //         pointer: Phaser.Input.Pointer,
        //         gameObjects: Array<Phaser.GameObjects.GameObject>,
        //         dx: number,
        //         dy: number
        //     ) => {
        //         //zoom in
        //         if (dy < 0) {
        //             camera.zoom += 0.1
        //         }
        //         //zoom out
        //         else {
        //             camera.zoom -= 0.1
        //         }
        //     }
        // )
    }
}
