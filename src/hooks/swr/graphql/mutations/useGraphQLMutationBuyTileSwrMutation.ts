import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationBuyTileParams, mutationBuyTile } from "@/modules/apollo"

export type UseGraphQLBuyTileMutationArgs = MutationBuyTileParams

export const useGraphQLMutationBuyTileSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLBuyTileMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLBuyTileMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationBuyTile(params)
        }
    )

    return {
        swrMutation,
    }
} 