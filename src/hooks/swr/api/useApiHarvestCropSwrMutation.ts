import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { harvestCrop, HarvestCropRequest, HarvestCropResponse } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"
import { AxiosResponse } from "axios"

export type UseApiHarvestCropSwrMutationArgs = WithAxiosOptionsAndRequest<HarvestCropRequest>

export const useApiHarvestCropSwrMutation = (): UseSWRMutation<
  AxiosResponse<HarvestCropResponse>,
  UseApiHarvestCropSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiHarvestCropSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            return await harvestCrop(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
