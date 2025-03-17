import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHelpWaterParams, mutationHelpWater } from "@/modules/apollo"

export type UseGraphQLHelpWaterMutationArgs = MutationHelpWaterParams

export const useGraphQLHelpWaterMutation = (): UseSWRMutation<
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
            await mutationHelpWater(params)
        }
    )

    return {
        swrMutation,
    }
} 