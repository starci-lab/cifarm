import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationFeedAnimalParams, mutationFeedAnimal } from "@/modules/apollo"

export type UseGraphQLFeedAnimalMutationArgs = MutationFeedAnimalParams

export const useGraphQLFeedAnimalMutation = (): UseSWRMutation<void, UseGraphQLFeedAnimalMutationArgs> => {
    const swrMutation = useSWRMutation(v4(), async (_: string, { arg }: { arg: UseGraphQLFeedAnimalMutationArgs }) => {
        await mutationFeedAnimal(arg)
    })

    return { swrMutation }
} 