import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { feedAnimal, FeedAnimalRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiFeedAnimalSwrMutationArgs = WithAxiosOptionsAndRequest<FeedAnimalRequest>

export const useApiFeedAnimalSwrMutation = (): UseSWRMutation<
  void,
  UseApiFeedAnimalSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiFeedAnimalSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await feedAnimal(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
