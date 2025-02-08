import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { collectAnimalProduct, CollectAnimalProductRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiCollectAnimalProductSwrMutationArgs = WithAxiosOptionsAndRequest<CollectAnimalProductRequest>

export const useApiCollectAnimalProductSwrMutation = (): UseSWRMutation<
  void,
  UseApiCollectAnimalProductSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiCollectAnimalProductSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await collectAnimalProduct(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
