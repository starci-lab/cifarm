import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationBuySeedsParams, mutationBuySeeds } from "@/modules/apollo"

export type UseGraphQLBuySeedsMutationArgs = MutationBuySeedsParams

export const useGraphQLBuySeedsMutation = (): UseSWRMutation<
  void,
  UseGraphQLBuySeedsMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLBuySeedsMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationBuySeeds(params)
        }
    )

    return {
        swrMutation,
    }
} 