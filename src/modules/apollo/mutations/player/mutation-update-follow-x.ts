import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams } from "../../types"
const mutation1 = gql`
  mutation UpdateFollowX {
    updateFollowX
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
    return await authClient.mutate<{ updateFollowX: null }>({
        mutation: mutationDocument,
    })
}
