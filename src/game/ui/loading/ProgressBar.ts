import { BootstrapAssetKey } from "../../assets"
import { ConstructorParams, OverlapSizerBaseConstructorParams } from "../../types"
import { OverlapSizer } from "phaser3-rex-plugins/templates/ui/ui-components"

export class ProgressBar extends OverlapSizer {
    // loading bar
    private loadingBar: Phaser.GameObjects.Image
    private loadingFill: Phaser.GameObjects.Image | undefined
    // constructor
    constructor({ baseParams: { scene, config }, options }: ConstructorParams<OverlapSizerBaseConstructorParams, ProgressBarOptions>) {
        //add loading bar
        const loadingBar = scene.add
            .image(0, 0, BootstrapAssetKey.LoadingBar)
        // We add the loading bar to the container

        const { progress = 0 } = { ...options }
        // super to call the parent class constructor
        super(
            scene, {
                width: loadingBar.width,
                height: loadingBar.height,
                ...config
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
        // // declare a unique frame name
        const originTexture = this.scene.textures.get(
            BootstrapAssetKey.LoadingFill
        )
        // add the new frame to the texture
        const sourceImage = originTexture.getSourceImage() as HTMLImageElement
        const width = sourceImage.width * progress
        const height = sourceImage.height
        // // add the new frame to the texture
        if (!this.loadingFill) {
            this.loadingFill = this.scene.add.image(0, 0, BootstrapAssetKey.LoadingFill).setCrop(0, 0, width, height)
            this.add(this.loadingFill, {
                align: "center",
                expand: false
            })
        } else {
            // if loaderFill is found, update the frame
            this.loadingFill
                .setCrop(0, 0, width, height)
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
    progress: number
}