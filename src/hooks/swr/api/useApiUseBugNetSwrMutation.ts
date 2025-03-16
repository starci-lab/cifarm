import { UseBugNetRequest, useBugNet } from "@/modules/axios"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { UseSWRMutation } from "../types"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiUseBugNetSwrMutationArgs = WithAxiosOptionsAndRequest<UseBugNetRequest>

export const useApiUseBugNetSwrMutation = (): UseSWRMutation<
  void,
  UseApiUseBugNetSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUseBugNetSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await useBugNet(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
