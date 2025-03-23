import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHarvestPlantParams, mutationHarvestPlant } from "@/modules/apollo"

export type UseGraphQLHarvestPlantMutationArgs = MutationHarvestPlantParams

export const useGraphQLMutationHarvestPlantSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLHarvestPlantMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHarvestPlantMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHarvestPlant(params)
        }
    )

    return {
        swrMutation,
    }
} 