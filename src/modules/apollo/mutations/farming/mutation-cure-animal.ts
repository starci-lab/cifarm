import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation CureAnimal($request: CureAnimalRequest!) {
        cureAnimal(request: $request)
    }
`

export enum MutationCureAnimal {
    Mutation1 = "mutation1",
}

export interface CureAnimalRequest {
    placedItemAnimalId: string
    inventorySupplyId: string
}

const mutationMap: Record<MutationCureAnimal, DocumentNode> = {
    [MutationCureAnimal.Mutation1]: mutation1,
}

export type MutationCureAnimalParams = MutationParams<MutationCureAnimal, CureAnimalRequest>

export const mutationCureAnimal = async ({
    mutation = MutationCureAnimal.Mutation1,
    request
}: MutationCureAnimalParams) => {
    if (!request) {
        throw new Error("Request is required for cure animal mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { cureAnimal: null },
        MutationVariables<CureAnimalRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 