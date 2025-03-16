import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"

const mutation1 = gql`
  mutation UpdateFollowX {
    updateFollowX
  }
`

export enum MutationUpdateFollowX {
  Mutation1 = "mutation1",
}

export interface MutationUpdateFollowXResponse {
  success: boolean;
}

const mutationMap: Record<MutationUpdateFollowX, DocumentNode> = {
    [MutationUpdateFollowX.Mutation1]: mutation1,
}

export interface MutationUpdateFollowXParams {
  query?: MutationUpdateFollowX;
}

export const mutateUpdateFollowX = async ({
    query = MutationUpdateFollowX.Mutation1,
}: MutationUpdateFollowXParams = {}) => {
    const mutationDocument = mutationMap[query]
    return await authClient.mutate<
    { updateFollowX: MutationUpdateFollowXResponse }
  >({
      mutation: mutationDocument
  })
} 