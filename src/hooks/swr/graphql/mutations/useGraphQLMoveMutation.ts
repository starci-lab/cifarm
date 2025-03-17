import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationMoveParams, mutationMove } from "@/modules/apollo"

export type UseGraphQLMoveMutationArgs = MutationMoveParams

export const useGraphQLMoveMutation = (): UseSWRMutation<
  void,
  UseGraphQLMoveMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLMoveMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationMove(params)
        }
    )

    return {
        swrMutation,
    }
} 