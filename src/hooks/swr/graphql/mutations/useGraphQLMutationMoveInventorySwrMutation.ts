import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationMoveInventoryParams, mutationMoveInventory } from "@/modules/apollo"

export type UseGraphQLMoveInventoryMutationArgs = MutationMoveInventoryParams

export const useGraphQLMutationMoveInventorySwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLMoveInventoryMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLMoveInventoryMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationMoveInventory(params)
        }
    )

    return {
        swrMutation,
    }
} 