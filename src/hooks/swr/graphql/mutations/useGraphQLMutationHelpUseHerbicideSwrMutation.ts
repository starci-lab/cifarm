import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHelpUseHerbicideParams, mutationHelpUseHerbicide } from "@/modules/apollo"

export type UseGraphQLHelpUseHerbicideMutationArgs = MutationHelpUseHerbicideParams

export const useGraphQLMutationHelpUseHerbicideSwrMutation = (): UseSWRMutation<
  void,
  UseGraphQLHelpUseHerbicideMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHelpUseHerbicideMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHelpUseHerbicide(params)
        }
    )

    return {
        swrMutation,
    }
} 