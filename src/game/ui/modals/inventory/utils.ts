import { CacheKey } from "@/game/types"
import { Scene } from "phaser"
import { HIGHLIGH_DEPTH } from "../../tutorial"
import { MODAL_BACKDROP_DEPTH_1 } from "../ModalManager"

export const getDepth = (scene: Scene,  plus = 0) => {
    return (
        (scene.cache.obj.get(CacheKey.TutorialActive)
            ? HIGHLIGH_DEPTH
            : MODAL_BACKDROP_DEPTH_1) + plus
    )
}