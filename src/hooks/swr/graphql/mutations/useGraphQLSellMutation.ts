import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationSellParams, mutationSell } from "@/modules/apollo"

export type UseGraphQLSellMutationArgs = MutationSellParams

export const useGraphQLSellMutation = (): UseSWRMutation<
  void,
  UseGraphQLSellMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLSellMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationSell(params)
        }
    )

    return {
        swrMutation,
    }
} 