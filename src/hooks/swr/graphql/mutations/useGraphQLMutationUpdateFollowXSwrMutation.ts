import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUpdateFollowXParams, mutationUpdateFollowX } from "@/modules/apollo"

export type UseGraphQLUpdateFollowXMutationArgs = MutationUpdateFollowXParams

export const useGraphQLMutationUpdateFollowXSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLUpdateFollowXMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUpdateFollowXMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationUpdateFollowX(params)
        }
    )

    return {
        swrMutation,
    }
} 