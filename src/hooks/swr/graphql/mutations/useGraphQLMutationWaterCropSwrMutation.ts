import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationWaterCropParams, mutationWaterCrop } from "@/modules/apollo"

export type UseGraphQLWaterCropMutationArgs = MutationWaterCropParams

export const useGraphQLMutationWaterCropSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLWaterCropMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLWaterCropMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationWaterCrop(params)
        }
    )

    return {
        swrMutation,
    }
} 