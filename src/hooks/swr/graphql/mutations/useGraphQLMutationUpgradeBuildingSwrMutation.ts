import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUpgradeBuildingParams, mutationUpgradeBuilding } from "@/modules/apollo"

export type UseGraphQLUpgradeBuildingMutationArgs = MutationUpgradeBuildingParams

export const useGraphQLMutationUpgradeBuildingSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLUpgradeBuildingMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUpgradeBuildingMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationUpgradeBuilding(params)
        }
    )

    return {
        swrMutation,
    }
} 