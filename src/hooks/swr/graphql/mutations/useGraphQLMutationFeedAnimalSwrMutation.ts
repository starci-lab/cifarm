import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { mutationFeedAnimal, MutationFeedAnimalParams } from "@/modules/apollo"

export type UseGraphQLFeedAnimalMutationArgs = MutationFeedAnimalParams

export const useGraphQLMutationFeedAnimalSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLFeedAnimalMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLFeedAnimalMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationFeedAnimal(params)
        }
    )

    return {
        swrMutation,
    }
} 