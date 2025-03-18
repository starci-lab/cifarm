import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationReturnParams, mutationReturn } from "@/modules/apollo"

export type UseGraphQLReturnMutationArgs = MutationReturnParams

export const useGraphQLMutationReturnSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLReturnMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLReturnMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationReturn(params)
        }
    )

    return {
        swrMutation,
    }
} 