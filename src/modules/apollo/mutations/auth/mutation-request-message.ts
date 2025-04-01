import { DocumentNode, gql } from "@apollo/client"
import { noCacheClient } from "../../client"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation RequestMessage {
    requestMessage {
      message
      success
      data {
        message
      }
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
    return await noCacheClient.mutate<
    { requestMessage: GraphQLResponse<MutationRequestMessageResponse> } 
  >({
      mutation: mutationDocument
  })
}
