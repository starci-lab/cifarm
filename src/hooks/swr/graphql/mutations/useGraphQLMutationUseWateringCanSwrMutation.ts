import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUseWateringCanParams, mutationUseWateringCan } from "@/modules/apollo"

export type UseGraphQLUseWateringCanMutationArgs = MutationUseWateringCanParams

export const useGraphQLMutationUseWateringCanSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLUseWateringCanMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUseWateringCanMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationUseWateringCan(params)
        }
    )

    return {
        swrMutation,
    }
} 