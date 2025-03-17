import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation UseHerbicide($request: UseHerbicideRequest!) {
        useHerbicide(request: $request)
    }
`

export enum MutationUseHerbicide {
    Mutation1 = "mutation1",
}

export interface UseHerbicideRequest {
    placedItemTileId: string
}

const mutationMap: Record<MutationUseHerbicide, DocumentNode> = {
    [MutationUseHerbicide.Mutation1]: mutation1,
}

export type MutationUseHerbicideParams = MutationParams<MutationUseHerbicide, UseHerbicideRequest>

export const mutationUseHerbicide = async ({
    mutation = MutationUseHerbicide.Mutation1,
    request
}: MutationUseHerbicideParams) => {
    if (!request) {
        throw new Error("Request is required for use herbicide mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { useHerbicide: null },
        MutationVariables<UseHerbicideRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 