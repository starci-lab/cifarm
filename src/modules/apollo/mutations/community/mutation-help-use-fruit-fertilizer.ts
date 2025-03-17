import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HelpUseFruitFertilizer($request: HelpUseFruitFertilizerRequest!) {
        helpUseFruitFertilizer(request: $request)
    }
`

export enum MutationHelpUseFruitFertilizer {
    Mutation1 = "mutation1",
}

export interface HelpUseFruitFertilizerRequest {
    placedItemFruitId: string
    inventorySupplyId: string
}

const mutationMap: Record<MutationHelpUseFruitFertilizer, DocumentNode> = {
    [MutationHelpUseFruitFertilizer.Mutation1]: mutation1,
}

export type MutationHelpUseFruitFertilizerParams = MutationParams<MutationHelpUseFruitFertilizer, HelpUseFruitFertilizerRequest>

export const mutationHelpUseFruitFertilizer = async ({
    mutation = MutationHelpUseFruitFertilizer.Mutation1,
    request
}: MutationHelpUseFruitFertilizerParams) => {
    if (!request) {
        throw new Error("Request is required for help use fruit fertilizer mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { helpUseFruitFertilizer: null },
        MutationVariables<HelpUseFruitFertilizerRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 