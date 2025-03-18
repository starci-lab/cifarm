import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHelpUseBugNetParams, mutationHelpUseBugNet } from "@/modules/apollo"

export type UseGraphQLHelpUseBugNetMutationArgs = MutationHelpUseBugNetParams

export const useGraphQLMutationHelpUseBugNetSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLHelpUseBugNetMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHelpUseBugNetMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHelpUseBugNet(params)
        }
    )

    return {
        swrMutation,
    }
} 