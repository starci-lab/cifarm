import { helpFeedAnimal, HelpFeedAnimalRequest } from "@/modules/axios"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { UseSWRMutation } from "../types"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiHelpFeedAnimalSwrMutationArgs = WithAxiosOptionsAndRequest<HelpFeedAnimalRequest>

export const useApiHelpFeedAnimalSwrMutation = (): UseSWRMutation<
  void,
  UseApiHelpFeedAnimalSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiHelpFeedAnimalSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await helpFeedAnimal(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
