import { useActionsEffects } from "./actions"
import { useQueryEffects } from "./load"
import { useStatesEffects } from "./states"
import { useReactStateEffects } from "./react-state"

export const useExternalEffects = () => {
    useQueryEffects()
    useActionsEffects()
    useStatesEffects()
    useReactStateEffects()
}
        
