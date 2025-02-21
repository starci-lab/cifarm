import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import {
    retainProduct,
    RetainProductRequest,
} from "@/modules/axios"
import { v4 } from "uuid"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiRetainProductSwrMutationArgs = WithAxiosOptionsAndRequest<RetainProductRequest>

export const useApiRetainProductSwrMutation = (): UseSWRMutation<
  void,
  UseApiRetainProductSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiRetainProductSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await retainProduct(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
