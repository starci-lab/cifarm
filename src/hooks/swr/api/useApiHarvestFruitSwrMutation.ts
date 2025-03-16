import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { harvestFruit, HarvestFruitRequest, HarvestFruitResponse } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"
import { AxiosResponse } from "axios"

export type UseApiHarvestFruitSwrMutationArgs = WithAxiosOptionsAndRequest<HarvestFruitRequest>

export const useApiHarvestFruitSwrMutation = (): UseSWRMutation<
  AxiosResponse<HarvestFruitResponse>,
  UseApiHarvestFruitSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiHarvestFruitSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            return await harvestFruit(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
