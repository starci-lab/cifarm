import { useNeighborsEffects } from "./useNeighborsEffects"
import { useReferralLinkEffects } from "./useReferralLinkEffects"

export const useModals = () => {
    useReferralLinkEffects()
    useNeighborsEffects()
}