import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { HelpUseHerbicideRequest, helpUseHerbicide } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiHelpUseHerbicideSwrMutationArgs = WithAxiosOptionsAndRequest<HelpUseHerbicideRequest>

export const useApiHelpUseHerbicideSwrMutation = (): UseSWRMutation<
  void,
  UseApiHelpUseHerbicideSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiHelpUseHerbicideSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            await helpUseHerbicide(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
