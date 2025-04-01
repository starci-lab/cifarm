import { useActionsEffects } from "./actions"
import { useQueryEffects } from "./load"
import { UseWsEffects } from "./ws"
import { useStatesEffects } from "./states"

export const useExternalEffects = () => {
    useQueryEffects()
    useActionsEffects()
    UseWsEffects()
    useStatesEffects()
}
        
