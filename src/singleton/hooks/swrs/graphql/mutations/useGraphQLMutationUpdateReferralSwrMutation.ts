import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUpdateReferralParams, mutationUpdateReferral } from "@/modules/apollo"

export type UseGraphQLUpdateReferralMutationArgs = MutationUpdateReferralParams

export const useGraphQLMutationUpdateReferralSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLUpdateReferralMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUpdateReferralMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationUpdateReferral(params)
        }
    )

    return {
        swrMutation,
    }
} 