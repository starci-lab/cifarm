import { GRAPHQL_MUTATION_CLAIM_DAILY_REWARD_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationClaimDailyRewardSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useClaimDailyRewardEffects = () => {
    //get the singleton instance of the claim daily reward mutation
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationClaimDailyRewardSwrMutation>
  >(GRAPHQL_MUTATION_CLAIM_DAILY_REWARD_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(EventName.RequestClaimDailyReward, async () => {
            let completedMessage: ResponsedMessage
            try {
                await swrMutation.trigger({})
                completedMessage = {
                    success: true,
                }
            } catch (error) {
                console.error(error)
                completedMessage = {
                    success: false,
                }
            }
            // return the user to the phaser game
            EventBus.emit(EventName.ClaimDailyRewardResponsed, completedMessage)
        })

        return () => {
            EventBus.removeListener(EventName.RequestClaimDailyReward)
        }
    }, [swrMutation])
}
