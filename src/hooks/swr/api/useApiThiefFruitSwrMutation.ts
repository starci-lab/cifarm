import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { ThiefFruitRequest, ThiefFruitResponse, thiefFruit } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"
import { AxiosResponse } from "axios"

export type UseApiThiefFruitSwrMutationArgs = WithAxiosOptionsAndRequest<ThiefFruitRequest>

export const useApiThiefFruitSwrMutation = (): UseSWRMutation<
  AxiosResponse<ThiefFruitResponse>,
  UseApiThiefFruitSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiThiefFruitSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            return await thiefFruit(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
