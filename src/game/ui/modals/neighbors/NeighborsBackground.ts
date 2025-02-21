import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { BaseAssetKey } from "../../../assets"
import { CloseModalMessage, EventBus, EventName } from "../../../event-bus"
import { onGameObjectPress } from "../../utils"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { ModalName } from "../../../event-bus"

export class NeighborsBackground extends ContainerLite {
    private wall: Phaser.GameObjects.Image
    private closeButton: Phaser.GameObjects.Image | undefined

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)
        
        // create the wall
        this.wall = this.scene.add.image(0, 0, BaseAssetKey.UIModalNeighborsWall)
        this.addLocal(this.wall)

        // create the close button
        this.closeButton = this.createCloseButton()
    }

    // create the close button
    public createCloseButton() {
        // create the close button
        const closeButton = this.scene.add.sprite(0, 0, BaseAssetKey.UIModalNeighborsIconClose).setOrigin(1, 0)
        this.scene.add.existing(closeButton)
        
        // add the on click event
        closeButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: closeButton,
                onPress: () => {
                    const eventMessage: CloseModalMessage = {
                        modalName: ModalName.Neighbors,
                    }
                    EventBus.emit(EventName.CloseModal, eventMessage)
                },
                scene: this.scene,
            })
        })
            
        // set the position of the close button
        closeButton.setPosition(this.wall.width / 2 - 50, - this.wall.height / 2 + 50)
        // add the close button to the sizer
        this.addLocal(closeButton)
        return closeButton
    }
}