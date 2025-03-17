import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation UpgradeBuilding($request: UpgradeBuildingRequest!) {
        upgradeBuilding(request: $request)
    }
`

export enum MutationUpgradeBuilding {
    Mutation1 = "mutation1",
}

export interface UpgradeBuildingRequest {
    placedItemBuildingId: string
}

const mutationMap: Record<MutationUpgradeBuilding, DocumentNode> = {
    [MutationUpgradeBuilding.Mutation1]: mutation1,
}

export type MutationUpgradeBuildingParams = MutationParams<MutationUpgradeBuilding, UpgradeBuildingRequest>

export const mutationUpgradeBuilding = async ({
    mutation = MutationUpgradeBuilding.Mutation1,
    request
}: MutationUpgradeBuildingParams) => {
    if (!request) {
        throw new Error("Request is required for upgrade building mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { upgradeBuilding: null },
        MutationVariables<UpgradeBuildingRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 