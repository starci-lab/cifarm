import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation Visit($request: VisitRequest!) {
        visit(request: $request)
    }
`

export enum MutationVisit {
    Mutation1 = "mutation1",
}

export interface VisitRequest {
    neighborUserId?: string
}

const mutationMap: Record<MutationVisit, DocumentNode> = {
    [MutationVisit.Mutation1]: mutation1,
}

export type MutationVisitParams = MutationParams<MutationVisit, VisitRequest>

export const mutationVisit = async ({
    mutation = MutationVisit.Mutation1,
    request
}: MutationVisitParams) => {
    if (!request) {
        throw new Error("Request is required for visit mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { visit: null },
        MutationVariables<VisitRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 