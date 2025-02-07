import {
    CloseTutorialMessage,
    EventName,
    OpenTutorialMessage,
} from "../../event-bus"
import { BLACK_COLOR } from "../../constants"
import { CacheKey, ContainerBaseConstructorParams } from "../../types"
import { UserEntity } from "@/modules/entities"
import { tutorialStepMap } from "./config"
import { Stacy } from "./Stacy"

export class TutorialManager extends Phaser.GameObjects.Container {
    private backdrop: Phaser.GameObjects.Rectangle | undefined
    private user: UserEntity
    private stacy: Stacy

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)

        // get the user from the cache
        this.user = this.scene.cache.obj.get(CacheKey.User)

        // get the width and height of the game
        const { width, height } = this.scene.game.scale
        this.backdrop = this.scene.add
            .rectangle(0, 0, width, height, BLACK_COLOR, 0.5)
            .setInteractive()
        this.add(this.backdrop)

        this.scene.events.on(
            EventName.OpenTutorial,
            (message: OpenTutorialMessage) => {
                this.onOpen(message)
            }
        )
        this.scene.events.on(
            EventName.CloseTutorial,
            (message: CloseTutorialMessage) => {
                this.onClose(message)
            }
        )
        // create Stacy
        this.stacy = new Stacy(this.scene)

        // close the modal manager by default
        this.setActive(false).setVisible(false)

        //this.start()
    }

    //run on start
    private start() {
        const { lastOfThisPhase, message, phase } =
      tutorialStepMap[this.user.tutorialStep]
        // do nothing if the tutorial step is last of this phase
        if (lastOfThisPhase) return
        const eventMessage: OpenTutorialMessage = {
            tutorialStep: this.user.tutorialStep,
        }
        this.scene.events.emit(EventName.OpenTutorial, eventMessage)
        console.log(message, phase)
    }

    // open the tutorial
    private onOpen({ tutorialStep }: OnOpenParams) {
        this.stacy.render(tutorialStep)
        this.setActive(true).setVisible(true)
    }

    // close the tutorial
    private onClose({ tutorialStep }: OnCloseParams) {
        console.log(tutorialStep)
        this.setActive(false).setVisible(false)
    }
}

export type OnOpenParams = OpenTutorialMessage;
export type OnCloseParams = CloseTutorialMessage;
