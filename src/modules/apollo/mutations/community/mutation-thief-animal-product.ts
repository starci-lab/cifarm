import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation ThiefAnimal($request: ThiefAnimalRequest!) {
        thiefAnimal(request: $request) {
            quantity
        }
    }
`

export enum MutationThiefAnimal {
    Mutation1 = "mutation1",
}

export interface ThiefAnimalRequest {
    placedItemAnimalId: string
}

export interface MutationThiefAnimalResponse {
    quantity: number
}

const mutationMap: Record<MutationThiefAnimal, DocumentNode> = {
    [MutationThiefAnimal.Mutation1]: mutation1,
}

export type MutationThiefAnimalParams = MutationParams<MutationThiefAnimal, ThiefAnimalRequest>

export const mutationThiefAnimal = async ({
    mutation = MutationThiefAnimal.Mutation1,
    request
}: MutationThiefAnimalParams) => {
    if (!request) {
        throw new Error("Request is required for thief animal mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { thiefAnimal: MutationThiefAnimalResponse },
        MutationVariables<ThiefAnimalRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 