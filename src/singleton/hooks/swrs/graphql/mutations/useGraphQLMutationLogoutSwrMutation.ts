import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationLogoutParams, mutationLogout } from "@/modules/apollo"

export type UseGraphQLLogoutMutationArgs = MutationLogoutParams

export const useGraphQLMutationLogoutSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLLogoutMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLLogoutMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationLogout(params)
        }
    )

    return {
        swrMutation,
    }
} 