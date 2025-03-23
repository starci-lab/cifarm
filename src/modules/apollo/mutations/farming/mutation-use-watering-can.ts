import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation UseWateringCan($request: UseWateringCanRequest!) {
        useWateringCan(request: $request)
    }
`

export enum MutationUseWateringCan {
    Mutation1 = "mutation1",
}

export interface UseWateringCanRequest {
    placedItemTileId: string
}

const mutationMap: Record<MutationUseWateringCan, DocumentNode> = {
    [MutationUseWateringCan.Mutation1]: mutation1,
}

export type MutationUseWateringCanParams = MutationParams<MutationUseWateringCan, UseWateringCanRequest>

export const mutationUseWateringCan = async ({
    mutation = MutationUseWateringCan.Mutation1,
    request
}: MutationUseWateringCanParams) => {
    if (!request) {
        throw new Error("Request is required for use watering can mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { useWateringCan: null },
    MutationVariables<UseWateringCanRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 