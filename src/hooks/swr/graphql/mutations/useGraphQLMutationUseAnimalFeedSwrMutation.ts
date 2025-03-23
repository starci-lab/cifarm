import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUseAnimalFeedParams, mutationUseAnimalFeed } from "@/modules/apollo"

export type UseGraphQLUseAnimalFeedMutationArgs = MutationUseAnimalFeedParams

export const useGraphQLMutationUseAnimalFeedSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLUseAnimalFeedMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUseAnimalFeedMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationUseAnimalFeed(params)
        }
    )

    return {
        swrMutation,
    }
} 