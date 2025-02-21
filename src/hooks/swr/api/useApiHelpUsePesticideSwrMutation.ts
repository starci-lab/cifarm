import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { HelpUsePesticideRequest, helpUsePesticide } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiHelpUsePesticideSwrMutationArgs = WithAxiosOptionsAndRequest<HelpUsePesticideRequest>

export const useApiHelpUsePesticideSwrMutation = (): UseSWRMutation<
  void,
  UseApiHelpUsePesticideSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiHelpUsePesticideSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            await helpUsePesticide(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
