import { useApiEffects } from "./api"
import { useGraphQLEffects } from "./graphql"
import { useModals } from "./modals"

export const useEffects = () => {
    useApiEffects()
    useGraphQLEffects()  
    useModals()
}