import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import {
    claimHoneycombDailyReward,
    ClaimHoneycombDailyRewardResponse,
} from "@/modules/axios"
import { v4 } from "uuid"
import { WithAxiosOptions } from "./types"
import { AxiosResponse } from "axios"

export type UseApiClaimHoneycombDailyRewardSwrMutationArgs = WithAxiosOptions

export const useApiClaimHoneycombDailyRewardSwrMutation = (): UseSWRMutation<
  AxiosResponse<ClaimHoneycombDailyRewardResponse>,
  UseApiClaimHoneycombDailyRewardSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiClaimHoneycombDailyRewardSwrMutationArgs }
        ) => {
            const { options } = { ...extraArgs.arg }
            //claim the daily reward
            return await claimHoneycombDailyReward(options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
