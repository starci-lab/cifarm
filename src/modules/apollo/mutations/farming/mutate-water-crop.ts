import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationVariables } from "../../types"

const mutation1 = gql`
  mutation WaterCrop($request: WaterCropRequest!) {
    waterCrop(request: $request)
  }
`

export enum MutationWaterCrop {
  Mutation1 = "mutation1",
}

export interface WaterCropRequest {
  placedItemTileId: string;
}

const mutationMap: Record<MutationWaterCrop, DocumentNode> = {
    [MutationWaterCrop.Mutation1]: mutation1,
}

export interface MutationWaterCropArgs {
  placedItemTileId: string;
}

export interface MutationWaterCropParams {
  query?: MutationWaterCrop;
  args?: MutationWaterCropArgs;
}

export const mutateWaterCrop = async ({
    query = MutationWaterCrop.Mutation1,
    args
}: MutationWaterCropParams) => {
    if (!args) {
        throw new Error("Args are required for water crop mutation")
    }
    
    const mutationDocument = mutationMap[query]
    return await authClient.mutate<
    { waterCrop: void },
    MutationVariables<WaterCropRequest>
  >({
      mutation: mutationDocument,
      variables: { request: args }
  })
} 