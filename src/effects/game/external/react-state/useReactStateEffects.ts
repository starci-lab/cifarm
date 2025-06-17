import { useSetPlacedItemEffects } from "./useSetPlacedItemEffects"
import { useModalEffects } from "./useModalEffects"
import { useGameStatesEffects } from "./useGameStatesEffects"
import { usePlayerContextEffects } from "./usePlayerContextEffects"

export const useReactStateEffects = () => {
    useSetPlacedItemEffects()
    useModalEffects()
    useGameStatesEffects()
    usePlayerContextEffects()
}   
