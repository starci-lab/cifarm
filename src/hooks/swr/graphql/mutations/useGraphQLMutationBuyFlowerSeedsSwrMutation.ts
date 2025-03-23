import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationBuyFlowerSeedsParams, mutationBuyFlowerSeeds } from "@/modules/apollo"

export type UseGraphQLBuyFlowerSeedsMutationArgs = MutationBuyFlowerSeedsParams

export const useGraphQLMutationBuyFlowerSeedsSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLBuyFlowerSeedsMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLBuyFlowerSeedsMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationBuyFlowerSeeds(params)
        }
    )

    return {
        swrMutation,
    }
} 