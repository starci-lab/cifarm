import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUseFruitFertilizerParams, mutationUseFruitFertilizer } from "@/modules/apollo"

export type UseGraphQLUseFruitFertilizerMutationArgs = MutationUseFruitFertilizerParams

export const useGraphQLMutationUseFruitFertilizerSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLUseFruitFertilizerMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUseFruitFertilizerMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationUseFruitFertilizer(params)
        }
    )

    return {
        swrMutation,
    }
} 