import { calculateUiDepth, UILayer } from "../../layers"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"

const KEY = "tutorial"

export const HIGHLIGH_DEPTH = calculateUiDepth({
    layer: UILayer.Tutorial,
    layerDepth: 1,
})

export const setTutorialDepth = <T extends ContainerLite>({
    gameObject,
}: SetTutorialDepthParams<T>) => {
    console.log("tutorial depth set")
    const retrievedValue = gameObject.getData(KEY)
    if (retrievedValue === null || retrievedValue === undefined) { 
        gameObject.setData(KEY, gameObject.depth)
    }
    gameObject.setDepth(HIGHLIGH_DEPTH)
}

export interface SetTutorialDepthParams<T extends ContainerLite> {
  gameObject: T;
}

// we return 1 just to make sure that the depth is always greater than before, so that layering is correct
export const restoreTutorialDepth = <T extends ContainerLite>({
    gameObject,
    plusOne = false,
}: RestoreTutorialDepthParams<T>) => {
    console.log("restore tutorial depth called")   
    const depth = gameObject.getData(KEY)
    if (depth === undefined) {
        throw new Error("Depth is not set")
    }
    gameObject.setDepth(depth + (plusOne ? 1 : 0))
    //remove the depth from cache
    gameObject.data.remove(KEY)
}

export interface RestoreTutorialDepthParams<T extends ContainerLite> {
  gameObject: T;
  plusOne?: boolean;
}
