import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HarvestPlant($request: HarvestPlantRequest!) {
        harvestPlant(request: $request) {
            quantity
        }
    }
`

export enum MutationHarvestPlant {
    Mutation1 = "mutation1",
}

export interface HarvestPlantRequest {
    placedItemTileId: string
}

export interface MutationHarvestPlantResponse {
    quantity: number
}

const mutationMap: Record<MutationHarvestPlant, DocumentNode> = {
    [MutationHarvestPlant.Mutation1]: mutation1,
}

export type MutationHarvestPlantParams = MutationParams<MutationHarvestPlant, HarvestPlantRequest>

export const mutationHarvestPlant = async ({
    mutation = MutationHarvestPlant.Mutation1,
    request
}: MutationHarvestPlantParams) => {
    if (!request) {
        throw new Error("Request is required for harvest plant mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { harvestPlant: MutationHarvestPlantResponse },
        MutationVariables<HarvestPlantRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 