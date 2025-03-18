import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationCureAnimalParams, mutationCureAnimal } from "@/modules/apollo"

export type UseGraphQLCureAnimalMutationArgs = MutationCureAnimalParams

export const useGraphQLMutationCureAnimalSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLCureAnimalMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLCureAnimalMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationCureAnimal(params)
        }
    )

    return {
        swrMutation,
    }
} 