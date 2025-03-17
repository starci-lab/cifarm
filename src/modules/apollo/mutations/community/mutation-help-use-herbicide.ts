import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HelpUseHerbicide($request: HelpUseHerbicideRequest!) {
        helpUseHerbicide(request: $request)
    }
`

export enum MutationHelpUseHerbicide {
    Mutation1 = "mutation1",
}

export interface HelpUseHerbicideRequest {
    placedItemTileId: string
}

const mutationMap: Record<MutationHelpUseHerbicide, DocumentNode> = {
    [MutationHelpUseHerbicide.Mutation1]: mutation1,
}

export type MutationHelpUseHerbicideParams = MutationParams<MutationHelpUseHerbicide, HelpUseHerbicideRequest>

export const mutationHelpUseHerbicide = async ({
    mutation = MutationHelpUseHerbicide.Mutation1,
    request
}: MutationHelpUseHerbicideParams) => {
    if (!request) {
        throw new Error("Request is required for help use herbicide mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { helpUseHerbicide: null },
        MutationVariables<HelpUseHerbicideRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 