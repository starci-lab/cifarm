import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import {
    deliverProduct,
    DeliverProductRequest,
} from "@/modules/axios"
import { v4 } from "uuid"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiDeliverProductSwrMutationArgs = WithAxiosOptionsAndRequest<DeliverProductRequest>

export const useApiDeliverProductSwrMutation = (): UseSWRMutation<
  void,
  UseApiDeliverProductSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiDeliverProductSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await deliverProduct(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
