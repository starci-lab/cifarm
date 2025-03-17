import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationPlantSeedParams, mutationPlantSeed } from "@/modules/apollo"

export type UseGraphQLPlantSeedMutationArgs = MutationPlantSeedParams

export const useGraphQLPlantSeedMutation = (): UseSWRMutation<
  void,
  UseGraphQLPlantSeedMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLPlantSeedMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationPlantSeed(params)
        }
    )

    return {
        swrMutation,
    }
} 