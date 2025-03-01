import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { BuySuppliesRequest, buySupplies } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiBuySuppliesSwrMutationArgs = WithAxiosOptionsAndRequest<BuySuppliesRequest>

export const useApiBuySuppliesSwrMutation = (): UseSWRMutation<
  void,
  UseApiBuySuppliesSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiBuySuppliesSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await buySupplies(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
