import { useNeighborsEffects } from "./useNeighborsEffects"
import { useQuestsEffects } from "./useQuestsEffects"
import { useReferralLinkEffects } from "./useReferralLinkEffects"

export const useModals = () => {
    useReferralLinkEffects()
    useNeighborsEffects()
    useQuestsEffects()
}
