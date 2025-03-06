import { useNeighborsEffects } from "./useNeighborsEffects"
import { useProfileEffects } from "./useProfileEffects"
import { useQuestsEffects } from "./useQuestsEffects"
import { useReferralLinkEffects } from "./useReferralLinkEffects"

export const useModalsEffects = () => {
    useReferralLinkEffects()
    useNeighborsEffects()
    useQuestsEffects()
    useProfileEffects()
}
