import { UseFertilizerRequest, useFertilizer } from "@/modules/axios"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { UseSWRMutation } from "../types"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiUseFertilizerSwrMutationArgs = WithAxiosOptionsAndRequest<UseFertilizerRequest>

export const useApiUseFertilizerSwrMutation = (): UseSWRMutation<
  void,
  UseApiUseFertilizerSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUseFertilizerSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await useFertilizer(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
