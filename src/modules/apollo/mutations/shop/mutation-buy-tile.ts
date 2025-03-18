import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { Position, TileId } from "@/modules/entities"

const mutation1 = gql`
    mutation BuyTile($request: BuyTileRequest!) {
        buyTile(request: $request)
    }
`

export enum MutationBuyTile {
    Mutation1 = "mutation1",
}

export interface BuyTileRequest {
    position: Position
    tileId: TileId
}

const mutationMap: Record<MutationBuyTile, DocumentNode> = {
    [MutationBuyTile.Mutation1]: mutation1,
}

export type MutationBuyTileParams = MutationParams<MutationBuyTile, BuyTileRequest>

export const mutationBuyTile = async ({
    mutation = MutationBuyTile.Mutation1,
    request
}: MutationBuyTileParams) => {
    if (!request) {
        throw new Error("Request is required for buy tile mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { buyTile: null },
        MutationVariables<BuyTileRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 