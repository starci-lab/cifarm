import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
    mutation Follow($request: FollowRequest!) {
        follow(request: $request) {
            message
            success
        }
    }
`

export enum MutationFollow {
    Mutation1 = "mutation1",
}

export interface FollowRequest {
    followeeUserId: string
}

const mutationMap: Record<MutationFollow, DocumentNode> = {
    [MutationFollow.Mutation1]: mutation1,
}

export type MutationFollowParams = MutationParams<MutationFollow, FollowRequest>

export const mutationFollow = async ({
    mutation = MutationFollow.Mutation1,
    request
}: MutationFollowParams) => {
    if (!request) {
        throw new Error("Request is required for follow mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { follow: GraphQLResponse },
        MutationVariables<FollowRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 