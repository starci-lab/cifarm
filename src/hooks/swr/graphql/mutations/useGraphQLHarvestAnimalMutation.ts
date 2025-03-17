import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHarvestAnimalParams, mutationHarvestAnimal } from "@/modules/apollo"

export type UseGraphQLHarvestAnimalMutationArgs = MutationHarvestAnimalParams

export const useGraphQLHarvestAnimalMutation = (): UseSWRMutation<
  void,
  UseGraphQLHarvestAnimalMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHarvestAnimalMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHarvestAnimal(params)
        }
    )

    return {
        swrMutation,
    }
} 