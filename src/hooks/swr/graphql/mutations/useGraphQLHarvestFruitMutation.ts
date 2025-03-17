import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHarvestFruitParams, mutationHarvestFruit } from "@/modules/apollo"

export type UseGraphQLHarvestFruitMutationArgs = MutationHarvestFruitParams

export const useGraphQLHarvestFruitMutation = (): UseSWRMutation<
  void,
  UseGraphQLHarvestFruitMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHarvestFruitMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHarvestFruit(params)
        }
    )

    return {
        swrMutation,
    }
} 