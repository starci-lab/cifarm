import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationFollowParams, mutationFollow } from "@/modules/apollo"

export type UseGraphQLFollowMutationArgs = MutationFollowParams

export const useGraphQLMutationFollowSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLFollowMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLFollowMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationFollow(params)
        }
    )

    return {
        swrMutation,
    }
} 