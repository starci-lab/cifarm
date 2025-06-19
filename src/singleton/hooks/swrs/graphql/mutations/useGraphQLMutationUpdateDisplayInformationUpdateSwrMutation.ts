import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUpdateDisplayInformationParams, mutationUpdateDisplayInformation, GraphQLResponse } from "@/modules/apollo"

export type UseGraphQLUpdateDisplayInformationMutationArgs = MutationUpdateDisplayInformationParams

export const useGraphQLMutationUpdateDisplayInformationSwrMutation = (): UseSWRMutation<
  GraphQLResponse,
  UseGraphQLUpdateDisplayInformationMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUpdateDisplayInformationMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            const result = await mutationUpdateDisplayInformation(params)
            if (!result.data) {
                throw new Error("No data returned from update display information mutation")
            }
            return result.data.updateDisplayInformation
        }
    )

    return {
        swrMutation,
    }
} 