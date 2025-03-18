import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationRetainProductParams, mutationRetainProduct } from "@/modules/apollo"

export type UseGraphQLRetainProductMutationArgs = MutationRetainProductParams

export const useGraphQLMutationRetainProductSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLRetainProductMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLRetainProductMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationRetainProduct(params)
        }
    )

    return {
        swrMutation,
    }
} 