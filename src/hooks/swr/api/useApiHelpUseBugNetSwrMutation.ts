import { helpUseBugNet, HelpUseBugNetRequest } from "@/modules/axios"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { UseSWRMutation } from "../types"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiHelpUseBugNetSwrMutationArgs = WithAxiosOptionsAndRequest<HelpUseBugNetRequest>

export const useApiHelpUseBugNetSwrMutation = (): UseSWRMutation<
  void,
  UseApiHelpUseBugNetSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiHelpUseBugNetSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await helpUseBugNet(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
