import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams } from "../../types"
import { GraphQLResponse } from "../types"
const mutation1 = gql`
  mutation Logout($request: LogoutRequest!) {
    logout(request: $request) {
      success
      message
    }
  }
`

export enum MutationLogout {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationLogout, DocumentNode> = {
    [MutationLogout.Mutation1]: mutation1,
}

export interface LogoutRequest {
    refreshToken: string
}

export type MutationLogoutParams = MutationParams<MutationLogout, LogoutRequest>;

export const mutationLogout = async ({
    mutation = MutationLogout.Mutation1,
    request
}: MutationLogoutParams) => {
    if (!request) {
        throw new Error("Request is required for logout mutation")
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<{ logout: GraphQLResponse }>({
        mutation: mutationDocument,
        variables: { request }
    })
}
