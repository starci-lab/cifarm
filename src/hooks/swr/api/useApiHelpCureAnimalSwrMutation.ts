import { HelpCureAnimalRequest, helpCureAnimal } from "@/modules/axios"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { UseSWRMutation } from "../types"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiHelpCureAnimalSwrMutationArgs = WithAxiosOptionsAndRequest<HelpCureAnimalRequest>

export const useApiHelpCureAnimalSwrMutation = (): UseSWRMutation<
  void,
  UseApiHelpCureAnimalSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiHelpCureAnimalSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            await helpCureAnimal(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
