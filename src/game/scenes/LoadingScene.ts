import { Scene } from "phaser"
import { SceneName } from "../scene"
import { AssetKey } from "../assets/base"
import { LoadingProgressContainer } from "../containers"
import { EventBus, EventName } from "../event-bus"

export class LoadingScene extends Scene {
    // loading progress
    private loadingAuthenticated = 10
    private loadingTotal: number = 0

    // loading fill width and height
    private loadingProgressContainer: LoadingProgressContainer | undefined

    constructor() {
        super(SceneName.LoadingScene) 
        //define point for loading
        this.loadingTotal = this.loadingAuthenticated
    }

    init() {
        //emit the event
        EventBus.emit(EventName.Authenticate, this)
        //listen for authentication event
        EventBus.on(EventName.Authenticated, () => {
            this.authenticated()
        })
        // Listen to the shutdown event
        this.events.on("shutdown", this.shutdown, this)
    }

    shutdown() {
        EventBus.off(EventName.Authenticated)
    }

    async create() {
        // get the width and height of the game
        const { width, height } = this.game.scale

        //  We loaded this image in our Boottrap Scene, so we can display it here
        this.add.image(width / 2, height / 2, AssetKey.Background)
        // We add logo to the scene
        const logo = this.add
            .image(width / 2, height / 4, AssetKey.Logo)
            .setScale(0.75)
        //  Animate the logo
        this.tweens.add({
            targets: logo,
            y: height / 3,
            ease: "Power1",
            duration: 2000,
            loop: -1,
            yoyo: true,
        })

        // create the loading progress container
        this.loadingProgressContainer = new LoadingProgressContainer(
            this,
            width / 2,
            height * 0.85,
            {
                loadingTotal: this.loadingTotal,
            }
        )
        // add the loading progress container to the scene
        this.add.existing(this.loadingProgressContainer)
    }

    update(time: number, delta: number) {
        if (this.loadingProgressContainer) {
            this.loadingProgressContainer.update(time, delta)
        }
    }

    private tryFinishLoading() {
        if (!this.loadingProgressContainer) {
            throw new Error("Loading progress container not found")
        }
        const finished = this.loadingProgressContainer.finished()
        if (finished) {
            this.scene.start(SceneName.Gameplay)
        }
    }

    async authenticated() {
        if (!this.loadingProgressContainer) {
            throw new Error("Loading progress container not found")
        }
        await this.loadingProgressContainer.updateLoadingProgress(this.loadingAuthenticated)
        this.tryFinishLoading()
    }
}
