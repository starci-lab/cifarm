import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { water, WaterRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiWaterSwrMutationArgs = WithAxiosOptionsAndRequest<WaterRequest>

export const useApiWaterSwrMutation = (): UseSWRMutation<
  void,
  UseApiWaterSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiWaterSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await water(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
