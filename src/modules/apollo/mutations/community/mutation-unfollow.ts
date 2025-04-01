import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
    mutation Unfollow($request: UnfollowRequest!) {
        unfollow(request: $request) {
            message 
            success
        }
    }
`

export enum MutationUnfollow {
    Mutation1 = "mutation1",
}

export interface UnfollowRequest {
    followeeUserId: string
}

const mutationMap: Record<MutationUnfollow, DocumentNode> = {
    [MutationUnfollow.Mutation1]: mutation1,
}

export type MutationUnfollowParams = MutationParams<MutationUnfollow, UnfollowRequest>

export const mutationUnfollow = async ({
    mutation = MutationUnfollow.Mutation1,
    request
}: MutationUnfollowParams) => {
    if (!request) {
        throw new Error("Request is required for unfollow mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { unfollow: GraphQLResponse },
        MutationVariables<UnfollowRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 