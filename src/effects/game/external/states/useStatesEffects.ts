import { useGameStatesEffects } from "../react-state/useGameStatesEffects"
import { useModalEffects } from "../react-state/useModalEffects"
import { usePlayerContextEffects } from "../react-state/usePlayerContextEffects"
import { useTutorialEffects } from "../react-state/useTutorialEffects"

export const useStatesEffects = () => {
    useGameStatesEffects()
    useModalEffects()
    usePlayerContextEffects()
    useTutorialEffects()
}