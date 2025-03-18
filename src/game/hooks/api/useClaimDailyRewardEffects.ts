import { GRAPHQL_MUTATION_CLAIM_DAILY_REWARD_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationClaimDailyRewardSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useClaimDailyRewardEffects = () => {
    //get the singleton instance of the claim daily reward mutation
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationClaimDailyRewardSwrMutation>
    >(GRAPHQL_MUTATION_CLAIM_DAILY_REWARD_SWR_MUTATION)
    
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