import {
    CloseTutorialMessage,
    EventName,
    OpenTutorialMessage,
} from "../../event-bus"
import { BLACK_COLOR } from "../../constants"
import {
    CacheKey,
    ContainerLiteBaseConstructorParams,
} from "../../types"
import { UserEntity } from "@/modules/entities"
import { tutorialStepMap } from "./config"
import { Stacy } from "./Stacy"
import { getScreenCenterX, getScreenCenterY } from "../utils"
import { calculateDepth, SceneLayer } from "@/game/layers"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"

export class TutorialManager extends ContainerLite {
    private backdrop: Phaser.GameObjects.Rectangle | undefined
    private user: UserEntity
    private stacy: Stacy

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // set the size of the container to the size of the game
        const { width: gameWidth, height: gameHeight } = scene.game.scale
        this.setSize(gameWidth, gameHeight)

        // get the user from the cache
        this.user = this.scene.cache.obj.get(CacheKey.User)
        
        // get the width and height of the game
        const scale = this.scene.game.scale
        this.backdrop = this.scene.add
            .rectangle(
                getScreenCenterX(this.scene),
                getScreenCenterY(this.scene),
                scale.width,
                scale.height,
                BLACK_COLOR,
                0.5
            )
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
        this.stacy = new Stacy({
            scene: this.scene,
        })
        this.scene.add.existing(this.stacy)
        this.pin(this.stacy, {})

        this.stacy.setDepth(calculateDepth({
            layer: SceneLayer.Tutorial,
            additionalDepth: 1,
        }))
        console.log(this.stacy)
        this.start()
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
        if (!this.backdrop) {
            throw new Error("Backdrop not found")
        }
        this.setActive(true).setVisible(true)

        this.stacy.show()
        this.stacy.render()
    }

    // close the tutorial
    private onClose({ tutorialStep }: OnCloseParams) {
        if (!this.backdrop) {
            throw new Error("Backdrop not found")
        }
        this.setActive(false).setVisible(false)
        this.stacy.hide()
    }
}

export type OnOpenParams = OpenTutorialMessage;
export type OnCloseParams = CloseTutorialMessage;
