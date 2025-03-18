import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { ToolId } from "@/modules/entities"

const mutation1 = gql`
    mutation BuyTool($request: BuyToolRequest!) {
        buyTool(request: $request)
    }
`

export enum MutationBuyTool {
    Mutation1 = "mutation1",
}

export interface BuyToolRequest {
    toolId: ToolId
}

const mutationMap: Record<MutationBuyTool, DocumentNode> = {
    [MutationBuyTool.Mutation1]: mutation1,
}

export type MutationBuyToolParams = MutationParams<MutationBuyTool, BuyToolRequest>

export const mutationBuyTool = async ({
    mutation = MutationBuyTool.Mutation1,
    request
}: MutationBuyToolParams) => {
    if (!request) {
        throw new Error("Request is required for buy tool mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { buyTool: null },
        MutationVariables<BuyToolRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 