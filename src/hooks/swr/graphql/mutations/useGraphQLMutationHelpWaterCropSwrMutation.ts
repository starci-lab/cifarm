import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHelpWaterParams, mutationHelpWater } from "@/modules/apollo"

export type UseGraphQLHelpWaterCropMutationArgs = MutationHelpWaterParams

export const useGraphQLMutationHelpWaterCropSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLHelpWaterCropMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHelpWaterCropMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHelpWater(params)
        }
    )

    return {
        swrMutation,
    }
} 