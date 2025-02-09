import { BaseAssetKey } from "@/game/assets"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
//import { InventoryContent } from "./InventoryContent"

export class InventoryBackground extends ContainerLite {
    private wall: Phaser.GameObjects.Image | undefined
    

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        this.wall = this.scene.add.image(0, 0, BaseAssetKey.ModalInventoryWall).setOrigin(0.5, 1)
        // const content = new InventoryContent({
        //     scene: this.scene,
        //     x: 0,
        //     y: -height * 0.5,
        //     width: width * 0.8,
        //     height: height * 0.8,

        // })
        this.addLocal(this.wall)

        
    }
}