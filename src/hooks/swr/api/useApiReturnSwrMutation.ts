import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { _return } from "@/modules/axios"
import { WithAxiosOptions } from "./types"

export type UseApiReturnSwrMutationArgs = WithAxiosOptions

export const useApiReturnSwrMutation = (): UseSWRMutation<
  void,
  UseApiReturnSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiReturnSwrMutationArgs }
        ) => {
            const { options } = { ...extraArgs.arg }
            await _return(options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
