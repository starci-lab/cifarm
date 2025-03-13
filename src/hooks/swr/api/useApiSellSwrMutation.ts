import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { sell, SellRequest, SellResponse } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"
import { AxiosResponse } from "axios"

export type UseApiSellSwrMutationArgs = WithAxiosOptionsAndRequest<SellRequest>

export const useApiSellSwrMutation = (): UseSWRMutation<
  AxiosResponse<SellResponse>,
  UseApiSellSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiSellSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            return await sell(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
