import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationBuyCropSeedsParams, mutationBuyCropSeeds } from "@/modules/apollo"

export type UseGraphQLBuyCropSeedsMutationArgs = MutationBuyCropSeedsParams

export const useGraphQLMutationBuyCropSeedsSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLBuyCropSeedsMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLBuyCropSeedsMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationBuyCropSeeds(params)
        }
    )

    return {
        swrMutation,
    }
} 