import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { BuySeedsRequest, buySeeds } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiBuySeedsSwrMutationArgs = WithAxiosOptionsAndRequest<BuySeedsRequest>

export const useApiBuySeedsSwrMutation = (): UseSWRMutation<
  void,
  UseApiBuySeedsSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiBuySeedsSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await buySeeds(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
