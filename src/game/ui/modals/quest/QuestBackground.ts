import { BaseAssetKey } from "@/game/assets"
import { ContainerBaseConstructorParams } from "../../../types"

export class QuestBackground extends Phaser.GameObjects.Container {
    private wall: Phaser.GameObjects.Image

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)
        
        // create the wall
        this.wall = this.scene.add.image(0, 0, BaseAssetKey.ModalQuestWall)
        this.add(this.wall)
        
    }
}