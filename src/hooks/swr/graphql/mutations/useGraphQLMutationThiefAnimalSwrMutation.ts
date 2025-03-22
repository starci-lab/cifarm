import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationThiefAnimalParams, mutationThiefAnimal } from "@/modules/apollo"

export type UseGraphQLThiefAnimalMutationArgs = MutationThiefAnimalParams

export const useGraphQLMutationThiefAnimalSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLThiefAnimalMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLThiefAnimalMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationThiefAnimal(params)
        }
    )

    return {
        swrMutation,
    }
} 