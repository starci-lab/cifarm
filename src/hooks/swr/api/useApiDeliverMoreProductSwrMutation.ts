import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import {
    deliverMoreProduct,
    DeliverMoreProductRequest,
} from "@/modules/axios"
import { v4 } from "uuid"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiDeliverMoreProductSwrMutationArgs = WithAxiosOptionsAndRequest<DeliverMoreProductRequest>

export const useApiDeliverMoreProductSwrMutation = (): UseSWRMutation<
  void,
  UseApiDeliverMoreProductSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiDeliverMoreProductSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await deliverMoreProduct(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
