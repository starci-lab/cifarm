import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation UseAnimalFeed($request: UseAnimalFeedRequest!) {
        useAnimalFeed(request: $request)
    }
`

export enum MutationUseAnimalFeed {
    Mutation1 = "mutation1",
}

export interface UseAnimalFeedRequest {
    placedItemAnimalId: string
    inventorySupplyId: string
}

const mutationMap: Record<MutationUseAnimalFeed, DocumentNode> = {
    [MutationUseAnimalFeed.Mutation1]: mutation1,
}

export type MutationUseAnimalFeedParams = MutationParams<MutationUseAnimalFeed, UseAnimalFeedRequest>

export const mutationUseAnimalFeed = async ({
    mutation = MutationUseAnimalFeed.Mutation1,
    request
}: MutationUseAnimalFeedParams) => {
    if (!request) {
        throw new Error("Request is required for use animal feed mutation")
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { useAnimalFeed: null },
        MutationVariables<UseAnimalFeedRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 