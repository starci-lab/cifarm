import { useGameStatesEffects } from "./useGameStatesEffects"
import { useModalEffects } from "./useModalEffects"
import { usePlayerContextEffects } from "./usePlayerContextEffects"
export const useStatesEffects = () => {
    useGameStatesEffects()
    useModalEffects()
    usePlayerContextEffects()
}