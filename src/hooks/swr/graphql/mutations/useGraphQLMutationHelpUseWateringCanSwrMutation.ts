import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import {
    MutationHelpUseWateringCanParams,
    mutationHelpUseWateringCan,
} from "@/modules/apollo"

export type UseGraphQLHelpUseWateringCanMutationArgs = MutationHelpUseWateringCanParams

export const useGraphQLMutationHelpUseWateringCanSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLHelpUseWateringCanMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHelpUseWateringCanMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHelpUseWateringCan(params)
        }
    )

    return {
        swrMutation,
    }
} 