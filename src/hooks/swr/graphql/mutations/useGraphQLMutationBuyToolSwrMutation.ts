import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationBuyToolParams, mutationBuyTool } from "@/modules/apollo"

export type UseGraphQLBuyToolMutationArgs = MutationBuyToolParams

export const useGraphQLMutationBuyToolSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLBuyToolMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLBuyToolMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationBuyTool(params)
        }
    )

    return {
        swrMutation,
    }
} 