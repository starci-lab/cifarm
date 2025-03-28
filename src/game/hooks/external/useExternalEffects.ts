import { useActionsEffects } from "./actions"
import { useQueryEffects } from "./load"
import { useIoEffects } from "./io"
import { useStatesEffects } from "./states"

export const useExternalEffects = () => {
    useQueryEffects()
    useActionsEffects()
    useIoEffects()
    useStatesEffects()
}
        
