import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationThiefAnimalProductParams, mutationThiefAnimalProduct } from "@/modules/apollo"

export type UseGraphQLThiefAnimalProductMutationArgs = MutationThiefAnimalProductParams

export const useGraphQLMutationThiefAnimalProductSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLThiefAnimalProductMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLThiefAnimalProductMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationThiefAnimalProduct(params)
        }
    )

    return {
        swrMutation,
    }
} 