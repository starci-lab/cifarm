import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams } from "../../types"
import { GraphQLResponse } from "../types"
const mutation1 = gql`
  mutation UpdateDisplayInformation($request: UpdateDisplayInformationInput!) {
    updateDisplayInformation(request: $request) {
      message
      success
    }
  }
`

export interface UpdateDisplayInformationInput {
  username?: string;
  avatarUrl?: string;
}

export enum MutationUpdateDisplayInformation {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationUpdateDisplayInformation, DocumentNode> = {
    [MutationUpdateDisplayInformation.Mutation1]: mutation1,
}

export type MutationUpdateDisplayInformationParams = MutationParams<
  MutationUpdateDisplayInformation,
  UpdateDisplayInformationInput
>;

export const mutationUpdateDisplayInformation = async ({
    mutation = MutationUpdateDisplayInformation.Mutation1,
    request,
}: MutationUpdateDisplayInformationParams) => {
    const mutationDocument = mutationMap[mutation]
    if (!request) {
        throw new Error("Request is required for update display information mutation")
    }
    return await authClient.mutate<{ updateDisplayInformation: GraphQLResponse }>(
        {
            mutation: mutationDocument,
            variables: { request },
        }
    )
}
