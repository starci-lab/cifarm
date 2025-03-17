import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUseBugNetParams, mutationUseBugNet } from "@/modules/apollo"

export type UseGraphQLUseBugNetMutationArgs = MutationUseBugNetParams

export const useGraphQLUseBugNetMutation = (): UseSWRMutation<
  void,
  UseGraphQLUseBugNetMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUseBugNetMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationUseBugNet(params)
        }
    )

    return {
        swrMutation,
    }
} 