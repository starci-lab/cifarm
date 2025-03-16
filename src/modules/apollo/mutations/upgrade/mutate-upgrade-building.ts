import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationVariables } from "../../types"

const mutation1 = gql`
  mutation UpgradeBuilding($request: UpgradeBuildingRequest!) {
    upgradeBuilding(request: $request)
  }
`

export enum MutationUpgradeBuilding {
  Mutation1 = "mutation1",
}

export interface UpgradeBuildingRequest {
  placedItemBuildingId: string;
}

export interface MutationUpgradeBuildingResponse {
  success: boolean;
}

const mutationMap: Record<MutationUpgradeBuilding, DocumentNode> = {
    [MutationUpgradeBuilding.Mutation1]: mutation1,
}

export interface MutationUpgradeBuildingArgs {
  placedItemBuildingId: string;
}

export interface MutationUpgradeBuildingParams {
  query?: MutationUpgradeBuilding;
  args?: MutationUpgradeBuildingArgs;
}

export const mutateUpgradeBuilding = async ({
    query = MutationUpgradeBuilding.Mutation1,
    args
}: MutationUpgradeBuildingParams) => {
    if (!args) {
        throw new Error("Args are required for upgrade building mutation")
    }
    
    const mutationDocument = mutationMap[query]
    return await authClient.mutate<
    { upgradeBuilding: MutationUpgradeBuildingResponse },
    MutationVariables<UpgradeBuildingRequest>
  >({
      mutation: mutationDocument,
      variables: { request: args }
  })
} 