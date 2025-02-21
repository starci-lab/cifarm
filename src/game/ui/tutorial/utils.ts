import { calculateUiDepth, UILayer } from "../../layers"
import { CacheKey } from "../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"

export const HIGHLIGH_DEPTH = calculateUiDepth({
    layer: UILayer.Tutorial,
    layerDepth: 1,
})

export const setTutorialDepth = <T extends ContainerLite>({
    gameObject,
    scene,
    storeDepth = true,
}: SetTutorialDepthParams<T>) => {
    // store the base depth in cache
    if (storeDepth) {
        scene.cache.obj.add(CacheKey.TutorialDepth, gameObject.depth)
    }
    // Set the depth of the gameObject
    gameObject.setDepth(HIGHLIGH_DEPTH)
}

export interface SetTutorialDepthParams<T extends ContainerLite> {
  scene: Phaser.Scene;
  gameObject: T;
  storeDepth?: boolean;
}

// we return 1 just to make sure that the depth is always greater than before, so that layering is correct
export const restoreTutorialDepth = <T extends ContainerLite>({
    gameObject,
    scene,
    plusOne = false,
}: RestoreTutorialDepthParams<T>) => {
    const data = scene.cache.obj.get(CacheKey.TutorialDepth)
    gameObject.setDepth(data + (plusOne ? 1 : 0))
    //remove the depth from cache
    scene.cache.obj.remove(CacheKey.TutorialDepth)
}

export interface RestoreTutorialDepthParams<T extends ContainerLite> {
  scene: Phaser.Scene;
  gameObject: T;
  plusOne?: boolean;
}
