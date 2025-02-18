import {
    CloseTutorialMessage,
    EventBus,
    EventName,
    OpenTutorialMessage,
} from "../../event-bus"
import {
    CacheKey,
    ContainerLiteBaseConstructorParams,
} from "../../types"
import { UserSchema } from "@/modules/entities"
import { tutorialStepMap } from "./config"
import { Stacy } from "./Stacy"
import { calculateUiDepth, UILayer } from "@/game/layers"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"

export class TutorialManager extends ContainerLite {
    private user: UserSchema
    private stacy: Stacy

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        // set the size of the container to the size of the game
        const { width: gameWidth, height: gameHeight } = scene.game.scale
        this.setSize(gameWidth, gameHeight)

        // get the user from the cache
        this.user = this.scene.cache.obj.get(CacheKey.User)
    
        this.scene.events.on(
            EventName.OpenTutorial,
            () => {
                this.onOpen()
            }
        )
        this.scene.events.on(
            EventName.CloseTutorial,
            () => {
                this.onClose()
            }
        )
        // create Stacy
        this.stacy = new Stacy({
            scene: this.scene,
        })
        this.scene.add.existing(this.stacy)

        this.stacy.setDepth(calculateUiDepth({
            layer: UILayer.Tutorial,
            layerDepth: 1,
        }))
        
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

    private showBackdrop() {
        EventBus.emit(EventName.ShowUIBackdrop, {
            depth: calculateUiDepth({
                layer: UILayer.Tutorial,
            }),
        })
    }

    private hideBackdrop() {
        EventBus.emit(EventName.HideUIBackdrop)
    }

    // open the tutorial
    private onOpen() {
        this.scene.cache.obj.add(CacheKey.TutorialActive, true)
        this.showBackdrop()
        this.stacy.show()
        this.stacy.render()
    }

    // close the tutorial
    private onClose() {
        this.scene.cache.obj.add(CacheKey.TutorialActive, false)
        this.hideBackdrop()
        this.stacy.hide()
    }
}

export type OnOpenParams = OpenTutorialMessage;
export type OnCloseParams = CloseTutorialMessage;
