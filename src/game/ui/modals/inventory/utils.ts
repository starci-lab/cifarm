import { CacheKey } from "@/game/types"
import { Scene } from "phaser"
import { HIGHLIGH_DEPTH } from "../../tutorial"
import { MODAL_BACKDROP_DEPTH_1 } from "../ModalManager"

export const getDepth = ({ scene, plus = 0, tutorialEnabled }: GetDepthParams) => {
    return (
        (scene.cache.obj.get(CacheKey.TutorialActive) && tutorialEnabled) 
            ? HIGHLIGH_DEPTH
            : MODAL_BACKDROP_DEPTH_1) + plus
}

export interface GetDepthParams {
    scene: Scene
    plus?: number
    tutorialEnabled?: boolean
}