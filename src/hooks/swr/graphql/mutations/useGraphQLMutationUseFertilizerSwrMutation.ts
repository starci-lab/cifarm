import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationUseFertilizerParams, mutationUseFertilizer } from "@/modules/apollo"

export type UseGraphQLUseFertilizerMutationArgs = MutationUseFertilizerParams

export const useGraphQLMutationUseFertilizerSwrMutation = (): UseSWRMutation<
    void,
    UseGraphQLUseFertilizerMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseGraphQLUseFertilizerMutationArgs }
        ) => {
            const params = { ...extraArgs.arg }
            await mutationUseFertilizer(params)
        }
    )

    return {
        swrMutation,
    }
} 