import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationDeliverMoreProductParams, mutationDeliverMoreProduct } from "@/modules/apollo"

export type UseGraphQLDeliverMoreProductMutationArgs = MutationDeliverMoreProductParams

export const useGraphQLDeliverMoreProductMutation = (): UseSWRMutation<
  void,
  UseGraphQLDeliverMoreProductMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLDeliverMoreProductMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationDeliverMoreProduct(params)
        }
    )

    return {
        swrMutation,
    }
} 