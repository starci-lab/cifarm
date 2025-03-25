import { useMutationEffects, useQueryEffects } from "./gameplay"
import { useIoEffects } from "./io"
import { useStatesEffects } from "./states"

export const useEffects = () => {
    useMutationEffects()
    useQueryEffects()
    useStatesEffects()
    useIoEffects()
}
