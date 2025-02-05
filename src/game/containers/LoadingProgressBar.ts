import { sleep } from "@/modules/common"
import { ConstructorParams, ContainerBaseConstructorParams } from "../types"
import { ProgressBar } from "./ProgressBar"
import { BaseText, TextColor } from "../ui/elements"

export interface LoadingProgressOptions {
  loadingTotal: number;
  steps?: number;
}

export class LoadingProgressBar extends Phaser.GameObjects.Container {
    private progressBar: ProgressBar | undefined
    private text: Phaser.GameObjects.Text

    private loadingProgress = 0
    // variables for actual loading progress
    private actualLoadingProgress = 0
    private loadingTotal = 0
    private steps = 20
    private totalLoadingDuration = 500 // 0.5 seconds
    private finishedLoading = false

    constructor({
        baseParams: { scene, x, y },
        options,
    }: ConstructorParams<
    ContainerBaseConstructorParams,
    LoadingProgressOptions
  >) {
        super(scene, x, y)
 
        const { loadingTotal = 0, steps } = { ...options}
        this.loadingTotal = loadingTotal
        this.steps = steps ?? this.steps

        // add the text
        this.text = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 80,
                text: "Loading...",
            },
            options: {
                fontSize: 32,
                textColor: TextColor.Brown
            },
        })
        this.scene.add.existing(this.text)
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
            `Loading${dots} (${(
                (this.loadingProgress / this.loadingTotal) *
        100
            ).toFixed(2)}%)`
        )
        this.updateCount++
    }

    // check if the loading is finished
    public finished() {
        return this.finishedLoading
    }

    // update the loading progress
    public async updateLoadingProgress(currentAmount: number) {
        const incrementAmount = currentAmount - this.actualLoadingProgress
        this.actualLoadingProgress = currentAmount
        // check if the loading is finished
        if (currentAmount >= this.loadingTotal) {
            this.finishedLoading = true
        }
        console.log("Actual" + this.actualLoadingProgress)
        
        if (incrementAmount < 0) {
            throw new Error("The current amount should be greater than the current loading progress")
        }
        //interate through the steps
        for (let i = 0; i < this.steps; i++) {
            this.loadingProgress += incrementAmount / this.steps
            await this.refreshLoadingBar()
            await sleep(this.totalLoadingDuration / this.steps)
        }
    }

    private async refreshLoadingBar() {
        // calculate the progress
        const loadedProgress = this.loadingProgress / this.loadingTotal
        // update the progress bar
        if (!this.progressBar) {
            this.progressBar = new ProgressBar({
                baseParams: {
                    scene: this.scene,
                    x: 0,
                    y: 0,
                },
                options: {
                    progress: loadedProgress,
                },
            }).setScale(4, 3)
            this.scene.add.existing(this.progressBar)
            this.add(this.progressBar)
        } else {
            this.progressBar.updateFill(loadedProgress)
        }
    }
}
