import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams } from "../../types"
import { GraphQLResponse } from "../types"
const mutation1 = gql`
  mutation UpdateFollowX {
    updateFollowX {
      message
      success
    }
  }
`

export enum MutationUpdateFollowX {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationUpdateFollowX, DocumentNode> = {
    [MutationUpdateFollowX.Mutation1]: mutation1,
}

export type MutationUpdateFollowXParams = MutationParams<MutationUpdateFollowX>;

export const mutationUpdateFollowX = async ({
    mutation = MutationUpdateFollowX.Mutation1,
}: MutationUpdateFollowXParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<{ updateFollowX: GraphQLResponse }>({
        mutation: mutationDocument,
    })
}
