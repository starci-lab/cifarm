import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { v4 } from "uuid"
import { MutationCureAnimalParams, mutationCureAnimal } from "@/modules/apollo"

export type UseGraphQLCureAnimalMutationArgs = MutationCureAnimalParams

export const useGraphQLCureAnimalMutation = (): UseSWRMutation<void, UseGraphQLCureAnimalMutationArgs> => {
    const swrMutation = useSWRMutation(v4(), async (_: string, { arg }: { arg: UseGraphQLCureAnimalMutationArgs }) => {
        await mutationCureAnimal(arg)
    })

    return { swrMutation }
} 