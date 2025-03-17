import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation UseBugNet($request: UseBugNetRequest!) {
        useBugNet(request: $request)
    }
`

export enum MutationUseBugNet {
    Mutation1 = "mutation1",
}

export interface UseBugNetRequest {
    placedItemTileId: string
}

const mutationMap: Record<MutationUseBugNet, DocumentNode> = {
    [MutationUseBugNet.Mutation1]: mutation1,
}

export type MutationUseBugNetParams = MutationParams<MutationUseBugNet, UseBugNetRequest>

export const mutationUseBugNet = async ({
    mutation = MutationUseBugNet.Mutation1,
    request
}: MutationUseBugNetParams) => {
    if (!request) {
        throw new Error("Request is required for use bug net mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { useBugNet: null },
        MutationVariables<UseBugNetRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 