import { ContainerBaseConstructorParams } from "../../types"
import { ProgressBar } from "./ProgressBar"
import { Text, TextColor } from "../elements"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"

export class LoadingProgressBar extends ContainerLite {
    private progressBar: ProgressBar | undefined
    private text: Phaser.GameObjects.Text

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)

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
                textColor: TextColor.Brown,
            },
        })
        this.scene.add.existing(this.text)
        this.addLocal(this.text)
    }

    public updateLoadingProgress({
        progress,
        text,
    }: UpdateLoadingProgressParams) {
        if (progress !== undefined) {
            if (!this.progressBar) {
                this.progressBar = new ProgressBar({
                    baseParams: {
                        scene: this.scene,
                    },
                    options: {
                        progress,
                    },
                }).setScale(1.5, 1.5)
                this.scene.add.existing(this.progressBar)
                this.addLocal(this.progressBar)
            } else {
                this.progressBar.updateFill(progress)
            }
        }
        if (text !== undefined) {
            this.text.setText(text)
        }
    }
}

export interface UpdateLoadingProgressParams {
  // text to display
  text?: string;
  // fill progress
  progress?: number;
}
