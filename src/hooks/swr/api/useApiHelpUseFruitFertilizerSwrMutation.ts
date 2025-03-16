import { helpUseFruitFertilizer, HelpUseFruitFertilizerRequest } from "@/modules/axios"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { UseSWRMutation } from "../types"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiHelpUseFruitFertilizerSwrMutationArgs = WithAxiosOptionsAndRequest<HelpUseFruitFertilizerRequest>

export const useApiHelpUseFruitFertilizerSwrMutation = (): UseSWRMutation<
  void,
  UseApiHelpUseFruitFertilizerSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiHelpUseFruitFertilizerSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await helpUseFruitFertilizer(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
