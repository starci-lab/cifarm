import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { usePesticide, UsePesticideRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiUsePesticideSwrMutationArgs = WithAxiosOptionsAndRequest<UsePesticideRequest>

export const useApiUsePesticideSwrMutation = (): UseSWRMutation<
  void,
  UseApiUsePesticideSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUsePesticideSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await usePesticide(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
