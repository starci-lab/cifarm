import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationThiefFruitParams, mutationThiefFruit } from "@/modules/apollo"

export type UseGraphQLThiefFruitMutationArgs = MutationThiefFruitParams

export const useGraphQLMutationThiefFruitSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLThiefFruitMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLThiefFruitMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationThiefFruit(params)
        }
    )

    return {
        swrMutation,
    }
} 