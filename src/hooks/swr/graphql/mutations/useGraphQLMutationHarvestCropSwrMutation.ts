import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHarvestCropParams, mutationHarvestCrop } from "@/modules/apollo"

export type UseGraphQLHarvestCropMutationArgs = MutationHarvestCropParams

export const useGraphQLMutationHarvestCropSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLHarvestCropMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHarvestCropMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHarvestCrop(params)
        }
    )

    return {
        swrMutation,
    }
} 