import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHelpCureAnimalParams, mutationHelpCureAnimal } from "@/modules/apollo"

export type UseGraphQLHelpCureAnimalMutationArgs = MutationHelpCureAnimalParams

export const useGraphQLMutationHelpCureAnimalSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLHelpCureAnimalMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHelpCureAnimalMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHelpCureAnimal(params)
        }
    )

    return {
        swrMutation,
    }
} 