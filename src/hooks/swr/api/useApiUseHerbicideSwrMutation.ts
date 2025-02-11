import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { useHerbicide, UseHerbicideRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiUseHerbicideSwrMutationArgs = WithAxiosOptionsAndRequest<UseHerbicideRequest>

export const useApiUseHerbicideSwrMutation = (): UseSWRMutation<
  void,
  UseApiUseHerbicideSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUseHerbicideSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await useHerbicide(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
