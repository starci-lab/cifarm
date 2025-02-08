import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import {
    claimDailyReward,
} from "@/modules/axios"
import { v4 } from "uuid"
import { WithAxiosOptions } from "./types"

export type UseApiClaimDailyRewardSwrMutationArgs = WithAxiosOptions

export const useApiClaimDailyRewardSwrMutation = (): UseSWRMutation<
  void,
  UseApiClaimDailyRewardSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiClaimDailyRewardSwrMutationArgs }
        ) => {
            const { options } = { ...extraArgs.arg }
            console.log("called")
            //update the tutorial only
            await claimDailyReward(options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
