import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHelpUseFruitFertilizerParams, mutationHelpUseFruitFertilizer } from "@/modules/apollo"

export type UseGraphQLHelpUseFruitFertilizerMutationArgs = MutationHelpUseFruitFertilizerParams

export const useGraphQLHelpUseFruitFertilizerMutation = (): UseSWRMutation<
  void,
  UseGraphQLHelpUseFruitFertilizerMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHelpUseFruitFertilizerMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHelpUseFruitFertilizer(params)
        }
    )

    return {
        swrMutation,
    }
} 