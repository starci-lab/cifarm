import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUnfollowParams, mutationUnfollow } from "@/modules/apollo"

export type UseGraphQLUnfollowMutationArgs = MutationUnfollowParams

export const useGraphQLMutationUnfollowSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLUnfollowMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUnfollowMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationUnfollow(params)
        }
    )

    return {
        swrMutation,
    }
} 