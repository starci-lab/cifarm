import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation PlantSeed($request: PlantSeedRequest!) {
        plantSeed(request: $request)
    }
`

export enum MutationPlantSeed {
    Mutation1 = "mutation1",
}

export interface PlantSeedRequest {
    inventorySeedId: string
    placedItemTileId: string
}

const mutationMap: Record<MutationPlantSeed, DocumentNode> = {
    [MutationPlantSeed.Mutation1]: mutation1,
}

export type MutationPlantSeedParams = MutationParams<MutationPlantSeed, PlantSeedRequest>

export const mutationPlantSeed = async ({
    mutation = MutationPlantSeed.Mutation1,
    request
}: MutationPlantSeedParams) => {
    if (!request) {
        throw new Error("Request is required for plant seed mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { plantSeed: null },
        MutationVariables<PlantSeedRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 