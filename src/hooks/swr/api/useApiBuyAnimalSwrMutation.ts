import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { BuyAnimalRequest, buyAnimal } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiBuyAnimalSwrMutationArgs = WithAxiosOptionsAndRequest<BuyAnimalRequest>

export const useApiBuyAnimalSwrMutation = (): UseSWRMutation<
  void,
  UseApiBuyAnimalSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiBuyAnimalSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            await buyAnimal(request, options)
        }
    )

    return {
        swrMutation,
    }
}
