import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HelpUseBugNet($request: HelpUseBugNetRequest!) {
        helpUseBugNet(request: $request)
    }
`

export enum MutationHelpUseBugNet {
    Mutation1 = "mutation1",
}

export interface HelpUseBugNetRequest {
    placedItemFruitId: string
}

const mutationMap: Record<MutationHelpUseBugNet, DocumentNode> = {
    [MutationHelpUseBugNet.Mutation1]: mutation1,
}

export type MutationHelpUseBugNetParams = MutationParams<MutationHelpUseBugNet, HelpUseBugNetRequest>

export const mutationHelpUseBugNet = async ({
    mutation = MutationHelpUseBugNet.Mutation1,
    request
}: MutationHelpUseBugNetParams) => {
    if (!request) {
        throw new Error("Request is required for help use bug net mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { helpUseBugNet: null },
        MutationVariables<HelpUseBugNetRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 