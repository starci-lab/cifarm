import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HelpFeedAnimal($request: HelpFeedAnimalRequest!) {
        helpFeedAnimal(request: $request)
    }
`

export enum MutationHelpFeedAnimal {
    Mutation1 = "mutation1",
}

export interface HelpFeedAnimalRequest {
    placedItemAnimalId: string
    inventorySupplyId: string
}

const mutationMap: Record<MutationHelpFeedAnimal, DocumentNode> = {
    [MutationHelpFeedAnimal.Mutation1]: mutation1,
}

export type MutationHelpFeedAnimalParams = MutationParams<MutationHelpFeedAnimal, HelpFeedAnimalRequest>

export const mutationHelpFeedAnimal = async ({
    mutation = MutationHelpFeedAnimal.Mutation1,
    request
}: MutationHelpFeedAnimalParams) => {
    if (!request) {
        throw new Error("Request is required for help feed animal mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { helpFeedAnimal: null },
        MutationVariables<HelpFeedAnimalRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 