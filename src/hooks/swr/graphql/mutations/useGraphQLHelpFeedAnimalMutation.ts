import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHelpFeedAnimalParams, mutationHelpFeedAnimal } from "@/modules/apollo"

export type UseGraphQLHelpFeedAnimalMutationArgs = MutationHelpFeedAnimalParams

export const useGraphQLHelpFeedAnimalMutation = (): UseSWRMutation<
  void,
  UseGraphQLHelpFeedAnimalMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHelpFeedAnimalMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHelpFeedAnimal(params)
        }
    )

    return {
        swrMutation,
    }
} 