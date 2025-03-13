import { BuyFruitRequest, buyFruit } from "@/modules/axios"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { UseSWRMutation } from "../types"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiBuyFruitSwrMutationArgs = WithAxiosOptionsAndRequest<BuyFruitRequest>

export const useApiBuyFruitSwrMutation = (): UseSWRMutation<
  void,
  UseApiBuyFruitSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiBuyFruitSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await buyFruit(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
