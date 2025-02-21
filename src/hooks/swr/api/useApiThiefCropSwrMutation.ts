import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { ThiefCropRequest, thiefCrop } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiThiefCropSwrMutationArgs = WithAxiosOptionsAndRequest<ThiefCropRequest>

export const useApiThiefCropSwrMutation = (): UseSWRMutation<
  void,
  UseApiThiefCropSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiThiefCropSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            await thiefCrop(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
