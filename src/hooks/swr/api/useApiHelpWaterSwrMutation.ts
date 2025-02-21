import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { helpWater, HelpWaterRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiHelpWaterSwrMutationArgs = WithAxiosOptionsAndRequest<HelpWaterRequest>

export const useApiHelpWaterSwrMutation = (): UseSWRMutation<
  void,
  UseApiHelpWaterSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiHelpWaterSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await helpWater(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
