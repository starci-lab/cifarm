import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationBuySuppliesParams, mutationBuySupplies } from "@/modules/apollo"

export type UseGraphQLBuySuppliesMutationArgs = MutationBuySuppliesParams

export const useGraphQLBuySuppliesMutation = (): UseSWRMutation<
  void,
  UseGraphQLBuySuppliesMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLBuySuppliesMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationBuySupplies(params)
        }
    )

    return {
        swrMutation,
    }
} 