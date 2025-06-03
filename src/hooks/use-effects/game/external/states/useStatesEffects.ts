import { useGameStatesEffects } from "./useGameStatesEffects"
import { useModalEffects } from "./useModalEffects"
import { usePlayerContextEffects } from "./usePlayerContextEffects"
import { useTutorialEffects } from "./useTutorialEffects"

export const useStatesEffects = () => {
    useGameStatesEffects()
    useModalEffects()
    usePlayerContextEffects()
    useTutorialEffects()
}