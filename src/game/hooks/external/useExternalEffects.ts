import { useActionsEffects } from "./actions"
import { useQueryEffects } from "./load"
import { UseConnectEffects } from "./connect"
import { useStatesEffects } from "./states"
import { useInfoEffects } from "./info"
export const useExternalEffects = () => {
    useQueryEffects()
    useActionsEffects()
    UseConnectEffects()
    useStatesEffects()
    useInfoEffects()
}
        
