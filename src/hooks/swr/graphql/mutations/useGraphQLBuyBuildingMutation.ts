import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationBuyBuildingParams, mutationBuyBuilding } from "@/modules/apollo"

export type UseGraphQLBuyBuildingMutationArgs = MutationBuyBuildingParams

export const useGraphQLBuyBuildingMutation = (): UseSWRMutation<
  void,
  UseGraphQLBuyBuildingMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLBuyBuildingMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationBuyBuilding(params)
        }
    )

    return {
        swrMutation,
    }
} 