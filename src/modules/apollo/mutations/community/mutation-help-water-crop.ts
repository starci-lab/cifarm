import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HelpWaterCrop($request: HelpWaterCropRequest!) {
        helpWaterCrop(request: $request)
    }
`

export enum MutationHelpWaterCrop {
    Mutation1 = "mutation1",
}

export interface HelpWaterCropRequest {
    placedItemTileId: string
}

const mutationMap: Record<MutationHelpWaterCrop, DocumentNode> = {
    [MutationHelpWaterCrop.Mutation1]: mutation1,
}

export type MutationHelpWaterCropParams = MutationParams<MutationHelpWaterCrop, HelpWaterCropRequest>

export const mutationHelpWaterCrop = async ({
    mutation = MutationHelpWaterCrop.Mutation1,
    request
}: MutationHelpWaterCropParams) => {
    if (!request) {
        throw new Error("Request is required for help water mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { helpWaterCrop: null },
        MutationVariables<HelpWaterCropRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 