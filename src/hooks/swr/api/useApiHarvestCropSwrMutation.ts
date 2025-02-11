import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { harvestCrop, HarvestCropRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiHarvestCropSwrMutationArgs = WithAxiosOptionsAndRequest<HarvestCropRequest>

export const useApiHarvestCropSwrMutation = (): UseSWRMutation<
  void,
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
            await harvestCrop(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
