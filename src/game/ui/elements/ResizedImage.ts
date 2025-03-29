import { ConstructorParams, ImageBaseConstructorParams } from "../../types"
import { v4 } from "uuid"

export interface ResizedImageOptions {
    width?: number;
    height?: number;
    widthPercentage?: number;
    heightPercentage?: number;
    baseKey: string;
    key?: string;
}
export class ResizedImage extends Phaser.GameObjects.Image {
    constructor({ baseParams: { scene, x, y}, options }: ConstructorParams<ImageBaseConstructorParams, ResizedImageOptions>) {
        if (!options) {
            throw new Error("ResizedImage requires options")
        }
        const { width, height, widthPercentage = 1, heightPercentage = 1, key = v4(), baseKey } = options
        const sourceImage = scene.textures.get(baseKey).getSourceImage() as HTMLImageElement
        sourceImage.width = Math.floor(width ?? (sourceImage.width * widthPercentage))
        console.log(sourceImage.width, sourceImage.width)
        sourceImage.height = Math.floor(height ?? (sourceImage.height * heightPercentage))
        console.log(sourceImage.height)
        // create other texture
        const texture = scene.textures.addImage(key, sourceImage)
        if (!texture) {
            throw new Error("Texture not found")
        }
        super(scene, x, y, texture)
    }
}