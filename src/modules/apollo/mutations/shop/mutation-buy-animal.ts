import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { AnimalId, Position } from "@/modules/entities"

const mutation1 = gql`
    mutation BuyAnimal($request: BuyAnimalRequest!) {
        buyAnimal(request: $request) {
            success
        }
    }
`

export enum MutationBuyAnimal {
    Mutation1 = "mutation1",
}

export interface BuyAnimalRequest {
    animalId: AnimalId
    position: Position
}

export interface MutationBuyAnimalResponse {
    success: boolean
}

const mutationMap: Record<MutationBuyAnimal, DocumentNode> = {
    [MutationBuyAnimal.Mutation1]: mutation1,
}

export type MutationBuyAnimalParams = MutationParams<MutationBuyAnimal, BuyAnimalRequest>

export const mutationBuyAnimal = async ({
    mutation = MutationBuyAnimal.Mutation1,
    request
}: MutationBuyAnimalParams) => {
    if (!request) {
        throw new Error("Request is required for buy animal mutation")
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { buyAnimal: MutationBuyAnimalResponse },
        MutationVariables<BuyAnimalRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 