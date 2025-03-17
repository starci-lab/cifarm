import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationThiefCropParams, mutationThiefCrop } from "@/modules/apollo"

export type UseGraphQLThiefCropMutationArgs = MutationThiefCropParams

export const useGraphQLThiefCropMutation = (): UseSWRMutation<
  void,
  UseGraphQLThiefCropMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLThiefCropMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationThiefCrop(params)
        }
    )

    return {
        swrMutation,
    }
} 