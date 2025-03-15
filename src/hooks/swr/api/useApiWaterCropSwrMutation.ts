import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { WithAxiosOptionsAndRequest } from "./types"
import { waterCrop, WaterCropRequest } from "@/modules/axios"

export type useApiWaterCropSwrMutationArgs = WithAxiosOptionsAndRequest<WaterCropRequest>

export const useApiWaterCropSwrMutation = (): UseSWRMutation<
  void,
  useApiWaterCropSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: useApiWaterCropSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await waterCrop(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
