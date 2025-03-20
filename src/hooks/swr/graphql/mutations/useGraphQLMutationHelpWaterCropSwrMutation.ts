import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationHelpWaterCropParams,
    mutationHelpWaterCrop,
} from "@/modules/apollo"

export type UseGraphQLHelpWaterCropMutationArgs = MutationHelpWaterCropParams

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
            await mutationHelpWaterCrop(params)
        }
    )

    return {
        swrMutation,
    }
} 