import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationThiefPlantParams, mutationThiefPlant } from "@/modules/apollo"

export type UseGraphQLThiefPlantMutationArgs = MutationThiefPlantParams

export const useGraphQLMutationThiefPlantSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLThiefPlantMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLThiefPlantMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationThiefPlant(params)
        }
    )

    return {
        swrMutation,
    }
} 