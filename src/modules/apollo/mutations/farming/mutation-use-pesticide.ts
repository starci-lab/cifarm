import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation UsePesticide($request: UsePesticideRequest!) {
        usePesticide(request: $request)
    }
`

export enum MutationUsePesticide {
    Mutation1 = "mutation1",
}

export interface UsePesticideRequest {
    placedItemTileId: string
}

const mutationMap: Record<MutationUsePesticide, DocumentNode> = {
    [MutationUsePesticide.Mutation1]: mutation1,
}

export type MutationUsePesticideParams = MutationParams<MutationUsePesticide, UsePesticideRequest>

export const mutationUsePesticide = async ({
    mutation = MutationUsePesticide.Mutation1,
    request
}: MutationUsePesticideParams) => {
    if (!request) {
        throw new Error("Request is required for use pesticide mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { usePesticide: null },
        MutationVariables<UsePesticideRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 