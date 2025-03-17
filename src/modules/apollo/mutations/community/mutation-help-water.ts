import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HelpWater($request: HelpWaterRequest!) {
        helpWater(request: $request)
    }
`

export enum MutationHelpWater {
    Mutation1 = "mutation1",
}

export interface HelpWaterRequest {
    placedItemTileId: string
}

const mutationMap: Record<MutationHelpWater, DocumentNode> = {
    [MutationHelpWater.Mutation1]: mutation1,
}

export type MutationHelpWaterParams = MutationParams<MutationHelpWater, HelpWaterRequest>

export const mutationHelpWater = async ({
    mutation = MutationHelpWater.Mutation1,
    request
}: MutationHelpWaterParams) => {
    if (!request) {
        throw new Error("Request is required for help water mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { helpWater: null },
        MutationVariables<HelpWaterRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 