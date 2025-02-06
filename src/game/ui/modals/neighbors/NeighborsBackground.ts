import { BaseAssetKey } from "../../../assets"
import { EventName } from "../../../event-bus"
import { ContainerBaseConstructorParams } from "../../../types"
import { onGameObjectClick } from "../../utils"
import { ModalName } from "../ModalManager"

export class NeighborsBackground extends Phaser.GameObjects.Container {
    private wall: Phaser.GameObjects.Image
    private closeButton: Phaser.GameObjects.Image | undefined

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)
        
        // create the wall
        this.wall = this.scene.add.image(0, 0, BaseAssetKey.ModalNeighborsWall)
        this.add(this.wall)


        // create the close button
        this.closeButton = this.createCloseButton()
    }

    // create the close button
    public createCloseButton() {
        // create the close button
        const closeButton = this.scene.add.sprite(0, 0, BaseAssetKey.ModalNeighborsIconClose).setOrigin(1, 0)
        this.scene.add.existing(closeButton)
        
        // add the on click event
        closeButton.setInteractive().on("pointerdown", () => {
            onGameObjectClick({
                gameObject: closeButton,
                onClick: () => {
                    this.scene.events.emit(EventName.CloseModal, ModalName.Neighbors)
                },
                scene: this.scene,
            })
        })
            
        // set the position of the close button
        closeButton.setPosition(this.wall.width / 2 - 50, - this.wall.height / 2 + 50)
        // add the close button to the sizer
        this.add(closeButton)
        return closeButton
    }
}