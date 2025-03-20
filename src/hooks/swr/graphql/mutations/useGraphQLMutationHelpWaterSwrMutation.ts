import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationHelpWaterCropParams,
    mutationHelpWaterCrop,
} from "@/modules/apollo"

export type UseGraphQLHelpWaterMutationArgs = MutationHelpWaterCropParams;

export const useGraphQLMutationHelpWaterSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLHelpWaterMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHelpWaterMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHelpWaterCrop(params)
        }
    )

    return {
        swrMutation,
    }
} 