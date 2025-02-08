import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { cureAnimal, CureAnimalRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiCureAnimalSwrMutationArgs = WithAxiosOptionsAndRequest<CureAnimalRequest>

export const useApiCureAnimalSwrMutation = (): UseSWRMutation<
  void,
  UseApiCureAnimalSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiCureAnimalSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await cureAnimal(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
