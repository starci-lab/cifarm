import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation FeedAnimal($request: FeedAnimalRequest!) {
        feedAnimal(request: $request)
    }
`

export enum MutationFeedAnimal {
    Mutation1 = "mutation1",
}

export interface FeedAnimalRequest {
    placedItemAnimalId: string
    inventorySupplyId: string
}

const mutationMap: Record<MutationFeedAnimal, DocumentNode> = {
    [MutationFeedAnimal.Mutation1]: mutation1,
}

export type MutationFeedAnimalParams = MutationParams<MutationFeedAnimal, FeedAnimalRequest>

export const mutationFeedAnimal = async ({
    mutation = MutationFeedAnimal.Mutation1,
    request
}: MutationFeedAnimalParams) => {
    if (!request) {
        throw new Error("Request is required for feed animal mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { feedAnimal: null },
        MutationVariables<FeedAnimalRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 