import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { ThiefAnimalProductRequest, ThiefAnimalProductResponse, thiefAnimalProduct } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"
import { AxiosResponse } from "axios"

export type UseApiThiefAnimalProductSwrMutationArgs = WithAxiosOptionsAndRequest<ThiefAnimalProductRequest>

export const useApiThiefAnimalProductSwrMutation = (): UseSWRMutation<
  AxiosResponse<ThiefAnimalProductResponse>,
  UseApiThiefAnimalProductSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiThiefAnimalProductSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            return await thiefAnimalProduct(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
