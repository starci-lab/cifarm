import NinePatch2 from "phaser3-rex-plugins/plugins/ninepatch2.js"
import {
    ConstructorParams,
    NinePatch2BaseConstructorParams,
} from "../../types/constructor-params/rexui"

// NinePatch3x3Options
export interface NinePatch3x3Options {
  // the asset key of the image to use
  assetKey: string;
  // the left width of the nine patch
  leftWidth?: number;
  // the right width of the nine patch
  rightWidth?: number;
  // the top height of the nine patch
  topHeight?: number;
  // the bottom height of the nine patch
  bottomHeight?: number;
}

export class NinePatch3x3 extends NinePatch2 {
    constructor({
        baseParams: { scene, config },
        options,
    }: ConstructorParams<NinePatch2BaseConstructorParams, NinePatch3x3Options>) {
        const {
            assetKey,
            leftWidth = 10,
            rightWidth = 10,
            topHeight = 10,
            bottomHeight = 10,
        } = options

        // get the source image
        const sourceImage = scene.textures.get(assetKey).getSourceImage()

        // create the nine patch 2x3
        super(scene, {
            key: assetKey,
            width: sourceImage.width,
            height: sourceImage.height,
            rows: [topHeight, undefined, bottomHeight],
            columns: [leftWidth, undefined, rightWidth],
            // put the rest of the config
            ...config,
        })
    }
}
