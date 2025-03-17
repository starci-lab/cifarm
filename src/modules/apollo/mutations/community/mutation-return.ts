import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams } from "../../types"

const mutation1 = gql`
    mutation Return {
        return
    }
`

export enum MutationReturn {
    Mutation1 = "mutation1",
}

const mutationMap: Record<MutationReturn, DocumentNode> = {
    [MutationReturn.Mutation1]: mutation1,
}

export type MutationReturnParams = MutationParams<MutationReturn>

export const mutationReturn = async ({
    mutation = MutationReturn.Mutation1
}: MutationReturnParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { return: null }
    >({
        mutation: mutationDocument
    })
} 