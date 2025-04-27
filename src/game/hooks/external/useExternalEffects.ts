import { useActionsEffects } from "./actions"
import { useQueryEffects } from "./load"
import { useStatesEffects } from "./states"
import { useInfoEffects } from "./info"

export const useExternalEffects = () => {
    useQueryEffects()
    useActionsEffects()
    useStatesEffects()
    useInfoEffects()
}
        
