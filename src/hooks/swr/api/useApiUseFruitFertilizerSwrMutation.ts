import { UseFruitFertilizerRequest, useFruitFertilizer } from "@/modules/axios"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { UseSWRMutation } from "../types"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiUseFruitFertilizerSwrMutationArgs = WithAxiosOptionsAndRequest<UseFruitFertilizerRequest>

export const useApiUseFruitFertilizerSwrMutation = (): UseSWRMutation<
  void,
  UseApiUseFruitFertilizerSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUseFruitFertilizerSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await useFruitFertilizer(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
