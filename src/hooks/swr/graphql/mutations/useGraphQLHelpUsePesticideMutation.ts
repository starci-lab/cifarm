import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationHelpUsePesticideParams, mutationHelpUsePesticide } from "@/modules/apollo"

export type UseGraphQLHelpUsePesticideMutationArgs = MutationHelpUsePesticideParams

export const useGraphQLHelpUsePesticideMutation = (): UseSWRMutation<
  void,
  UseGraphQLHelpUsePesticideMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLHelpUsePesticideMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationHelpUsePesticide(params)
        }
    )

    return {
        swrMutation,
    }
} 