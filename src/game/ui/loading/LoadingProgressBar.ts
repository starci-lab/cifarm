import { sleep } from "@/modules/common"
import { ConstructorParams, ContainerBaseConstructorParams } from "../../types"
import { ProgressBar } from "./ProgressBar"
import { Text, TextColor } from "../elements"

export interface LoadingProgressOptions {
  stepLength: number;
}

export interface LoadingQueue {
    // from percentage (i.e 0.2)
    from: number
    // to percentage (i.e 0.5)
    to: number
    // number of steps use to render the progress
    steps: number
    // text to display
    text: string
}

export class LoadingProgressBar extends Phaser.GameObjects.Container {
    private progressBar: ProgressBar | undefined
    private text: Phaser.GameObjects.Text
    // 0.04s per step
    private stepDuration = 0.02

    // loading queues, contains the loading progress
    private loadingQueues: Array<LoadingQueue> = []
    private isLoading = false
    constructor({
        baseParams: { scene, x, y },
        options,
    }: ConstructorParams<
    ContainerBaseConstructorParams,
    LoadingProgressOptions
  >) {
        super(scene, x, y)
 
        const { stepLength } = { ...options}
        this.stepDuration = stepLength ?? this.stepDuration

        // add the text
        this.text = new Text({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 80,
                text: "",
            },
            options: {
                fontSize: 32,
                textColor: TextColor.Brown
            },
        })
        this.scene.add.existing(this.text)
        this.add(this.text)
    }

    async update() {
        // is loading indicate that the loading is in progress, skip
        if (this.isLoading) {
            return
        }

        // if the loading queue has items
        if (this.loadingQueues.length > 0) {
            const queue = this.loadingQueues.shift()
            if (!queue) {
                return
            }
            await this.updateLoadingProgress(queue)
        }
    }

    // add the loading queue
    public addLoadingQueue(queue: LoadingQueue) {
        this.loadingQueues.push(queue)  
    }

    // update the loading progress
    public async updateLoadingProgress(queue: LoadingQueue) {
        this.isLoading = true
        //interate through the steps
        let progress = queue.from
        for (let i = 0; i < queue.steps; i++) {
            progress += (queue.to - queue.from) / queue.steps
            this.refreshLoadingBar(progress)
            this.updateText(`${queue.text} (${Math.floor(progress * 100)}%)`)
            await sleep(this.stepDuration)
        }
        this.isLoading = false
    }

    public queueEmpty() {
        return this.loadingQueues.length === 0
    }

    private updateText(text: string) {
        this.text.setText(text)
    }

    private refreshLoadingBar(progress: number) {
        // calculate the progress
        // update the progress bar
        if (!this.progressBar) {
            this.progressBar = new ProgressBar({
                baseParams: {
                    scene: this.scene,
                },
                options: {
                    progress,
                },
            }).setScale(4, 3)
            this.scene.add.existing(this.progressBar)
            this.add(this.progressBar)
        } else {
            this.progressBar.updateFill(progress)
        }
    }
}

export interface UpdateLoadingProgressParams {
    // text to display
    text: string
    // current step
    step: number
    // total steps
    totalSteps: number
}
