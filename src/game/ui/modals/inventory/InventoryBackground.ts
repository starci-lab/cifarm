import { BaseAssetKey } from "@/game/assets"
import { ContainerBaseConstructorParams } from "../../../types"
//import { InventoryContent } from "./InventoryContent"

export class InventoryBackground extends Phaser.GameObjects.Container {
    private wall: Phaser.GameObjects.Image | undefined
    

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)

        // get the width and height of the game
        const { width, height } = this.scene.game.scale

        this.wall = this.scene.add.image(0, 0, BaseAssetKey.ModalInventoryWall).setOrigin(0.5, 1)
        // const content = new InventoryContent({
        //     scene: this.scene,
        //     x: 0,
        //     y: -height * 0.5,
        //     width: width * 0.8,
        //     height: height * 0.8,

        // })
        this.add(this.wall)

        
    }
}