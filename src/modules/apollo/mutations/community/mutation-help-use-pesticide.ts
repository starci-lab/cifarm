import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HelpUsePesticide($request: HelpUsePesticideRequest!) {
        helpUsePesticide(request: $request)
    }
`

export enum MutationHelpUsePesticide {
    Mutation1 = "mutation1",
}

export interface HelpUsePesticideRequest {
    placedItemTileId: string
}

const mutationMap: Record<MutationHelpUsePesticide, DocumentNode> = {
    [MutationHelpUsePesticide.Mutation1]: mutation1,
}

export type MutationHelpUsePesticideParams = MutationParams<MutationHelpUsePesticide, HelpUsePesticideRequest>

export const mutationHelpUsePesticide = async ({
    mutation = MutationHelpUsePesticide.Mutation1,
    request
}: MutationHelpUsePesticideParams) => {
    if (!request) {
        throw new Error("Request is required for help use pesticide mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { helpUsePesticide: null },
        MutationVariables<HelpUsePesticideRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 