import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { MutationFollowParams, mutationFollow } from "@/modules/apollo"

export type UseGraphQLFollowMutationArgs = MutationFollowParams

export const useGraphQLMutationFollowSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLFollowMutationArgs
> => {
    const swrMutation = useSWRMutation(
        "FOLLOW",
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