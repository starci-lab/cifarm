import { useActionsEffects } from "./actions"
import { useQueryEffects } from "./load"
import { useSyncEffects } from "./sync"
import { useStatesEffects } from "./states"
import { useInfoEffects } from "./info"

export const useExternalEffects = () => {
    useQueryEffects()
    useActionsEffects()
    useSyncEffects()
    useStatesEffects()
    useInfoEffects()
}
        
