import { useActionsEffects } from "./actions"
import { useQueryEffects } from "./load"
import { UseWsEffects } from "./ws"
import { useStatesEffects } from "./states"
import { useInfoEffects } from "./info"
export const useExternalEffects = () => {
    useQueryEffects()
    useActionsEffects()
    UseWsEffects()
    useStatesEffects()
    useInfoEffects()
}
        
