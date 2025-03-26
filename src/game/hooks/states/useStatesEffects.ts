import { useGameStatesEffects } from "./useGameStatesEffects"
import { useModalEffects } from "./useModalEffects"
export const useStatesEffects = () => {
    useGameStatesEffects()
    useModalEffects()
}