import { v4 } from "uuid"
import { BootstrapAssetKey } from "../../assets"
import { ConstructorParams, SizerBaseConstructorParams } from "../../types"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"

export class ProgressBar extends Sizer {
    // loading bar
    private loadingBar: Phaser.GameObjects.Image
    private loadingFill: Phaser.GameObjects.Image | undefined
    // constructor
    constructor({ baseParams: { scene, config }, options }: ConstructorParams<SizerBaseConstructorParams, ProgressBarOptions>) {
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
        // calculate the progress
        const maxLoadingFillWidth = this.loadingBar.displayWidth
        const loadingFillWidth = maxLoadingFillWidth * progress
        const loadingFillHeight = this.loadingBar.displayHeight
        // declare a unique frame name
        const frameName = v4()
        // get the original texture
        const originTexture = this.scene.textures.get(
            BootstrapAssetKey.LoadingFill
        )
        // add the new frame to the texture
        const sourceImage = originTexture.getSourceImage()
        // add the new frame to the texture
       
        const texture = originTexture.add(
            frameName,
            0,
            0,
            0,
            (sourceImage.width) * progress,
            sourceImage.height
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
            this.add(this.loadingFill, {
                align: "left-center",
            })
        } else {
            // if loaderFill is found, update the frame
            this.loadingFill
                .setFrame(frameName)
                .setDisplaySize(loadingFillWidth, loadingFillHeight)
        }
        // destroy the old frame
        this.scene.textures.getFrame(frameName)?.destroy()
    }

    // get the actual size of the progress bar, based on the loading bar
    public getSize() {
        return {
            width: this.loadingBar.displayWidth,
            height: this.loadingBar.displayHeight,
        }
    }
}

export interface ProgressBarOptions {
    // current progress
    progress: number
}