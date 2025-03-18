import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams } from "../../types"

const mutation1 = gql`
  mutation UpdateTutorial {
    updateTutorial
  }
`

export enum MutationUpdateTutorial {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationUpdateTutorial, DocumentNode> = {
    [MutationUpdateTutorial.Mutation1]: mutation1,
}

export type MutationUpdateTutorialParams = MutationParams<MutationUpdateTutorial>

export const mutationUpdateTutorial = async ({
    mutation = MutationUpdateTutorial.Mutation1
}: MutationUpdateTutorialParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { updateTutorial: null }
  >({
      mutation: mutationDocument,
  })
} 