import { sleep } from "@/modules/common"
import { BootstrapAssetKey } from "../assets"
import { v4 } from "uuid"
import { FONT_DINOSAUR, TEXT_COLOR_1 } from "../constants"

export interface LoadingProgressParams {
  loadingTotal: number;
  steps?: number;
}
export class LoadingProgressContainer extends Phaser.GameObjects.Container {
    private loadingBar: Phaser.GameObjects.Image
    private loadingFill: Phaser.GameObjects.Image | undefined
    private text: Phaser.GameObjects.Text

    private loadingProgress = 0
    private loadingTotal = 0
    private steps = 20
    private totalLoadingDuration = 500 // 0.5 seconds

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        { loadingTotal, steps }: LoadingProgressParams
    ) {
        super(scene, x, y)
        this.steps = steps ?? this.steps
        // set the loading progress and total
        this.loadingTotal = loadingTotal
        //add loading bar
        this.loadingBar = scene.add
            .image(0, 0, BootstrapAssetKey.LoadingBar)
            .setScale(4, 3)
        // We add the loading bar to the container
        this.add(this.loadingBar)
        // add the text
        this.text = scene.add
            .text(0, 80, "Loading...", {
                fontSize: "32px",
                color: TEXT_COLOR_1,
                fontFamily: FONT_DINOSAUR,
            })
            .setOrigin(0.5, 0.5)
        this.add(this.text)
    }

    private numDots = 0
    private updateCount = 0
    update() {
        //0.33 seconds
        if (this.updateCount % 20 === 0) {
            this.numDots = (this.numDots + 1) % 4
        }
        const dots = ".".repeat(this.numDots)
        // update the loading bar
        this.text.setText(
            `Loading${dots} (${((this.loadingProgress / this.loadingTotal) * 100).toFixed(
                2
            )}%)`
        )
        this.updateCount++
    }

    // check if the loading is finished
    public finished() {
        return this.loadingProgress >= this.loadingTotal
    }

    // update the loading progress
    public async updateLoadingProgress(incrementAmount: number) {
    //interate through the steps
        for (let i = 0; i < this.steps; i++) {
            this.loadingProgress += incrementAmount / this.steps
            await this.refreshLoadingBar()
            await sleep(this.totalLoadingDuration / this.steps)
        }
    }

    private async refreshLoadingBar() {
        if (!this.loadingBar) {
            throw new Error("Loading bar not found")
        }
        // calculate the progress
        const loadedProgress = this.loadingProgress / this.loadingTotal
        const maxLoadingFillWidth = this.loadingBar.displayWidth - 10
        const loadingFillWidth = maxLoadingFillWidth * loadedProgress
        const loadingFillHeight = this.loadingBar.displayHeight - 10
        // declare a unique frame name
        const frameName = v4()
        // get the original texture
        const originTexture = this.scene.textures.get(BootstrapAssetKey.LoadingFill)
        // add the new frame to the texture
        const sourceImage = originTexture.getSourceImage()
        // add the new frame to the texture
        const cutLength = 2
        const texture = originTexture.add(
            frameName,
            0,
            cutLength,
            cutLength,
            (sourceImage.width - 2 * cutLength) * loadedProgress,
            sourceImage.height - 2 * cutLength
        )?.texture
        // if the texture is not found, throw an error
        if (!texture) {
            throw new Error("Cut texture not found")
        }
        // if loaderFill is not found, try add one
        if (!this.loadingFill) {
            this.loadingFill = this.scene.add
                .image(0, 0, texture, frameName)
                .setOrigin(0, 0.5)
                .setDisplaySize(loadingFillWidth, loadingFillHeight)
                .setPosition(-maxLoadingFillWidth / 2, 0)
            if (!this) {
                throw new Error("Container not found")
            }
            this.add(this.loadingFill)
        } else {
            // if loaderFill is found, update the frame
            this.loadingFill
                .setFrame(frameName)
                .setDisplaySize(loadingFillWidth, loadingFillHeight)
        }
        // destroy the old frame
        this.scene.textures.getFrame(frameName)?.destroy()
    }
}
