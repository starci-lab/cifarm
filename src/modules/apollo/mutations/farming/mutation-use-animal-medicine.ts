import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation UseAnimalMedicine($request: UseAnimalMedicineRequest!) {
        useAnimalMedicine(request: $request)
    }
`

export enum MutationUseAnimalMedicine {
    Mutation1 = "mutation1",
}

export interface UseAnimalMedicineRequest {
    placedItemAnimalId: string
}

const mutationMap: Record<MutationUseAnimalMedicine, DocumentNode> = {
    [MutationUseAnimalMedicine.Mutation1]: mutation1,
}

export type MutationUseAnimalMedicineParams = MutationParams<MutationUseAnimalMedicine, UseAnimalMedicineRequest>

export const mutationUseAnimalMedicine = async ({
    mutation = MutationUseAnimalMedicine.Mutation1,
    request
}: MutationUseAnimalMedicineParams) => {
    if (!request) {
        throw new Error("Request is required for use animal medicine mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { useAnimalMedicine: null },
        MutationVariables<UseAnimalMedicineRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 