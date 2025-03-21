import { useGraphQLMutationEffects, useGraphQLQueryEffects } from "./graphql"
import { useIoEffects } from "./io"
import { useModalsEffects } from "./modals"
import { useStatesEffects } from "./states"

export const useEffects = () => {
    useGraphQLMutationEffects()
    useGraphQLQueryEffects()
    useModalsEffects()
    useStatesEffects()
    useIoEffects()
}
