import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationBuyAnimalParams, mutationBuyAnimal } from "@/modules/apollo"

export type UseGraphQLBuyAnimalMutationArgs = MutationBuyAnimalParams

export const useGraphQLMutationBuyAnimalSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLBuyAnimalMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLBuyAnimalMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationBuyAnimal(params)
        }
    )

    return {
        swrMutation,
    }
} 