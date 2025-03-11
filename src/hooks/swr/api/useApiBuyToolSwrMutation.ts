import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { BuyToolRequest, buyTool } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiBuyToolSwrMutationArgs = WithAxiosOptionsAndRequest<BuyToolRequest>

export const useApiBuyToolSwrMutation = (): UseSWRMutation<
    void,
  UseApiBuyToolSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiBuyToolSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            await buyTool(request, options)
        }
    )

    return {
        swrMutation,
    }
}
