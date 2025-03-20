import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationClaimHoneycombDailyRewardParams,
    mutationClaimHoneycombDailyReward,
} from "@/modules/apollo"
import { FetchResult } from "@apollo/client"
import { TxResponse } from "@/modules/honeycomb"
export type UseGraphQLClaimHoneycombDailyRewardMutationArgs =
  MutationClaimHoneycombDailyRewardParams;

export const useGraphQLMutationClaimHoneycombDailyRewardSwrMutation =
  (): UseSWRMutation<
    FetchResult<{ claimHoneycombDailyReward: TxResponse }>,
    UseGraphQLClaimHoneycombDailyRewardMutationArgs
  > => {
      const swrMutation = useSWRMutation(
          v4(),
          async (
              _: string,
              extraArgs: { arg: UseGraphQLClaimHoneycombDailyRewardMutationArgs }
          ) => {
              const params = { ...extraArgs.arg }
              return await mutationClaimHoneycombDailyReward(params)
          }
      )

      return {
          swrMutation,
      }
  }
