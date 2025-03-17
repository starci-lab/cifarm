import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HarvestAnimal($request: HarvestAnimalRequest!) {
        harvestAnimal(request: $request) {
            quantity
        }
    }
`

export enum MutationHarvestAnimal {
    Mutation1 = "mutation1",
}

export interface HarvestAnimalRequest {
    placedItemAnimalId: string
}

export interface MutationHarvestAnimalResponse {
    quantity: number
}

const mutationMap: Record<MutationHarvestAnimal, DocumentNode> = {
    [MutationHarvestAnimal.Mutation1]: mutation1,
}

export type MutationHarvestAnimalParams = MutationParams<MutationHarvestAnimal, HarvestAnimalRequest>

export const mutationHarvestAnimal = async ({
    mutation = MutationHarvestAnimal.Mutation1,
    request
}: MutationHarvestAnimalParams) => {
    if (!request) {
        throw new Error("Request is required for harvest animal mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { harvestAnimal: MutationHarvestAnimalResponse },
        MutationVariables<HarvestAnimalRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 