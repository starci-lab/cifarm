import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"

const mutation1 = gql`
  mutation RequestMessage {
    requestMessage {
      message
    }
  }
`

export enum MutationRequestMessage {
  Mutation1 = "mutation1",
}

export interface MutationRequestMessageResponse {
  message: string;
}

const mutationMap: Record<MutationRequestMessage, DocumentNode> = {
    [MutationRequestMessage.Mutation1]: mutation1,
}

export interface MutationRequestMessageParams {
  query?: MutationRequestMessage;
}

export const mutationRequestMessage = async ({
    query = MutationRequestMessage.Mutation1,
}: MutationRequestMessageParams = {}) => {
    const mutationDocument = mutationMap[query]
    return await noCacheAuthClient.mutate<
    { requestMessage: MutationRequestMessageResponse } 
  >({
      mutation: mutationDocument
  })
}
