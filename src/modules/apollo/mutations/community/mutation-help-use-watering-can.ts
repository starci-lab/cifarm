import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HelpUseWateringCan($request: HelpUseWateringCanRequest!) {
        helpUseWateringCan(request: $request)
    }
`

export enum MutationHelpUseWateringCan {
    Mutation1 = "mutation1",
}

export interface HelpUseWateringCanRequest {
    placedItemTileId: string
}

const mutationMap: Record<MutationHelpUseWateringCan, DocumentNode> = {
    [MutationHelpUseWateringCan.Mutation1]: mutation1,
}

export type MutationHelpUseWateringCanParams = MutationParams<MutationHelpUseWateringCan, HelpUseWateringCanRequest>

export const mutationHelpUseWateringCan = async ({
    mutation = MutationHelpUseWateringCan.Mutation1,
    request
}: MutationHelpUseWateringCanParams) => {
    if (!request) {
        throw new Error("Request is required for help use watering can mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { helpUseWateringCan: null },
        MutationVariables<HelpUseWateringCanRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 