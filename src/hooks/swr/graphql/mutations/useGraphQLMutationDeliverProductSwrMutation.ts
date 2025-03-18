import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationDeliverProductParams, mutationDeliverProduct } from "@/modules/apollo"

export type UseGraphQLDeliverProductMutationArgs = MutationDeliverProductParams

export const useGraphQLMutationDeliverProductSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLDeliverProductMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLDeliverProductMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationDeliverProduct(params)
        }
    )

    return {
        swrMutation,
    }
} 