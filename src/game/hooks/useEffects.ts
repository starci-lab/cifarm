import { useGameplayEffects } from "./gameplay"
import { useIoEffects } from "./io"
import { useStatesEffects } from "./states"

export const useEffects = () => {
    useGameplayEffects()
    useStatesEffects()
    useIoEffects()
}
