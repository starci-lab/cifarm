import { Scene } from "phaser"
import { SceneName } from "../scene"
import { AssetName } from "../assets/base"
import { sleep } from "@/modules/common"
import { LoadingProgressContainer } from "../containers"

export class LoadingScene extends Scene {
    // We use this to keep track of the loading progress
    private loadingProgress = 0
    private loadingRequestMessage = 10
    private loadingVerifyMessage = 10
    private loadingTotal: number = 0
    private interval = 20

    // loading fill width and height
    private loadingProgressContainer: LoadingProgressContainer | undefined

    constructor() {
        super(SceneName.LoadingScene)
        //define point for loading
        this.loadingTotal = this.loadingRequestMessage + this.loadingVerifyMessage
    }

    async create() {
        // get the width and height of the game
        const { width, height } = this.game.scale

        //  We loaded this image in our Boottrap Scene, so we can display it here
        this.add.image(width / 2, height / 2, AssetName.Background)
        // We add logo to the scene
        const logo = this.add
            .image(width / 2, height / 4, AssetName.Logo)
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
                loadingProgress: this.loadingProgress,
                loadingTotal: this.loadingTotal,
            }
        )
        // add the loading progress container to the scene
        this.add.existing(this.loadingProgressContainer)

        // call the requestMessage function
        await this.requestMessage()

        // call the verifyMessage function
        await this.verifyMessage()

        //if both requestMessage and verifyMessage are successful, move to the next scene
        this.scene.start(SceneName.Gameplay)
    }

    update(time: number, delta: number) {
        if (this.loadingProgressContainer) {
            this.loadingProgressContainer.update(time, delta)
        }
    }

    async requestMessage() {
        await sleep(2000)
        if (!this.loadingProgressContainer) {
            throw new Error("Loading progress container not found")
        }
        await this.loadingProgressContainer.updateLoadingProgress(this.loadingRequestMessage)
    }

    async verifyMessage() {
        await sleep(2000)
        if (!this.loadingProgressContainer) {
            throw new Error("Loading progress container not found")
        }
        await this.loadingProgressContainer.updateLoadingProgress(this.loadingVerifyMessage)
    }
}
