import { API_CLAIM_DAILY_REWARD_SWR_MUTATION } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { useApiClaimDailyRewardSwrMutation } from "@/hooks"

export const useClaimDailyRewardEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiClaimDailyRewardSwrMutation>
      >(API_CLAIM_DAILY_REWARD_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestClaimDailyReward, async () => {
            await swrMutation.trigger({})
            // return the user to the phaser game
            EventBus.emit(EventName.ClaimDailyRewardCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestClaimDailyReward)
        }
    }, [swrMutation])
}