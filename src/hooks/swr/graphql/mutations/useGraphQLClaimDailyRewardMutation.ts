import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationClaimDailyRewardParams, mutationClaimDailyReward } from "@/modules/apollo"

export type UseGraphQLClaimDailyRewardMutationArgs = MutationClaimDailyRewardParams

export const useGraphQLClaimDailyRewardMutation = (): UseSWRMutation<
  void,
  UseGraphQLClaimDailyRewardMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLClaimDailyRewardMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationClaimDailyReward(params)
        }
    )

    return {
        swrMutation,
    }
} 