import { AssetBootstrapId, assetBootstrapMap } from "@/modules/assets"
import {
    ConstructorParams,
    OverlapSizerBaseConstructorParams,
} from "../../types"
import { OverlapSizer } from "phaser3-rex-plugins/templates/ui/ui-components"

export class ProgressBar extends OverlapSizer {
    // loading bar
    private loadingBar: Phaser.GameObjects.Image
    private loadingFill: Phaser.GameObjects.Image | undefined
    // constructor
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<OverlapSizerBaseConstructorParams, ProgressBarOptions>) {
    //add loading bar
        const loadingBar = scene.add.image(0, 0, assetBootstrapMap[AssetBootstrapId.LoadingBar].phaser.base.assetKey)
        // We add the loading bar to the container

        const { progress = 0 } = { ...options }
        // super to call the parent class constructor
        super(scene, {
            width: loadingBar.width,
            height: loadingBar.height,
            ...config,
        })
        // set the loading bar
        this.loadingBar = loadingBar
        this.addBackground(loadingBar)
        // update the fill
        this.updateFill(progress)
    }

    // update method
    public updateFill(progress: number) {
    // update the progress bar
        if (!this.loadingBar) {
            throw new Error("Loading bar not found")
        }
        // // add the new frame to the texture
        if (!this.loadingFill) {
            this.loadingFill = this.scene.add.image(
                0,
                0,
                assetBootstrapMap[AssetBootstrapId.LoadingFill].phaser.base.assetKey
            )
            this.loadingFill.setCrop(
                0,
                0,
                this.loadingFill.width * progress,
                this.loadingFill.height
            )
            this.add(this.loadingFill, {
                align: "center",
                expand: false,
            })
        } else {
            // if loaderFill is found, update the frame
            this.loadingFill.setCrop(
                0,
                0,
                this.loadingFill.width * progress,
                this.loadingFill.height
            )
        }
        // destroy the old frame
        this.layout()
    }

    // get the actual size of the progress bar, based on the loading bar
    public getSize() {
        return {
            width: this.loadingBar.width,
            height: this.loadingBar.height,
        }
    }
}

export interface ProgressBarOptions {
  // current progress
  progress: number;
}
