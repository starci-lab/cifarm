import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationBuyFruitParams, mutationBuyFruit } from "@/modules/apollo"

export type UseGraphQLBuyFruitMutationArgs = MutationBuyFruitParams

export const useGraphQLBuyFruitMutation = (): UseSWRMutation<
  void,
  UseGraphQLBuyFruitMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLBuyFruitMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationBuyFruit(params)
        }
    )

    return {
        swrMutation,
    }
} 