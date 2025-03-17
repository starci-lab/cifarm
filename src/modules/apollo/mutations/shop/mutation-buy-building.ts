import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { BuildingId, Position } from "@/modules/entities"

const mutation1 = gql`
    mutation BuyBuilding($request: BuyBuildingRequest!) {
        buyBuilding(request: $request)
    }
`

export enum MutationBuyBuilding {
    Mutation1 = "mutation1",
}

export interface BuyBuildingRequest {
    buildingId: BuildingId
    position: Position
}

const mutationMap: Record<MutationBuyBuilding, DocumentNode> = {
    [MutationBuyBuilding.Mutation1]: mutation1,
}

export type MutationBuyBuildingParams = MutationParams<MutationBuyBuilding, BuyBuildingRequest>

export const mutationBuyBuilding = async ({
    mutation = MutationBuyBuilding.Mutation1,
    request
}: MutationBuyBuildingParams) => {
    if (!request) {
        throw new Error("Request is required for buy building mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { buyBuilding: null },
        MutationVariables<BuyBuildingRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 