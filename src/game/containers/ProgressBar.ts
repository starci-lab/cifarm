import { v4 } from "uuid"
import { BootstrapAssetKey } from "../assets"
import { ConstructorParams, ContainerBaseConstructorParams } from "../types"

export class ProgressBar extends Phaser.GameObjects.Container {
    // loading bar
    private loadingBar: Phaser.GameObjects.Image
    private loadingFill: Phaser.GameObjects.Image | undefined
    // constructor
    constructor({ baseParams: { scene, x, y }, options }: ConstructorParams<ContainerBaseConstructorParams, ProgressBarOptions>) {
        const { progress } = options
        // super to call the parent class constructor
        super(scene, x, y)

        //add loading bar
        this.loadingBar = this.scene.add
            .image(0, 0, BootstrapAssetKey.LoadingBar)
        // We add the loading bar to the container
        this.add(this.loadingBar)
        // update the fill
        this.updateFill(progress)
    }

    // update method
    public updateFill(progress: number) {
        const cutLength = 2
        // update the progress bar
        if (!this.loadingBar) {
            throw new Error("Loading bar not found")
        }
        // calculate the progress
        const maxLoadingFillWidth = this.loadingBar.displayWidth - 2 * cutLength
        const loadingFillWidth = maxLoadingFillWidth * progress
        const loadingFillHeight = this.loadingBar.displayHeight - 2 * cutLength
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
            cutLength,
            cutLength,
            (sourceImage.width - 2 * cutLength) * progress,
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