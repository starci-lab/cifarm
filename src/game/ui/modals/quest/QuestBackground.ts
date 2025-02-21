import { BaseAssetKey } from "@/game/assets"
import { CloseModalMessage, EventBus, EventName, ModalName } from "../../../event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { onGameObjectPress } from "../../utils"

export class QuestBackground extends ContainerLite {
    private wall: Phaser.GameObjects.Image
    private closeButton: Phaser.GameObjects.Image | undefined

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // create the wall
        this.wall = this.scene.add.image(0, 0, BaseAssetKey.UIModalQuestWall)
        this.addLocal(this.wall)

        // create the close button
        this.closeButton = this.createCloseButton()
    }

    private createCloseButton() {
    // create the close button
        const closeButton = this.scene.add
            .image(0, 0, BaseAssetKey.UIModalQuestIconClose)
            .setPosition(this.wall.width / 2 - 50, -this.wall.height / 2 + 50)
            .setOrigin(1, 0)
        // add the on click event
        closeButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: closeButton,
                onPress: () => {
                    const eventMessage: CloseModalMessage = {
                        modalName: ModalName.Quest,
                    }
                    EventBus.emit(EventName.CloseModal, eventMessage)
                },
                animate: false,
                scene: this.scene,
            })
        })
        // set the close button position
        //closeButton.setPosition(this.wall.width/2, - this.wall.height/2)

        this.addLocal(closeButton)
        return closeButton
    }
}
