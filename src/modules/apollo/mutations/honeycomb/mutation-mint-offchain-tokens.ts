import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { TxResponse } from "@/modules/honeycomb"

const mutation1 = gql`
    mutation MintOffchainTokens($request: MintOffchainTokensRequest!) {
        mintOffchainTokens(request: $request) {
            txHash
            blockHash
            blockNumber
        }
    }
`

export enum MutationMintOffchainTokens {
    Mutation1 = "mutation1",
}

export interface MintOffchainTokensRequest {
    amount: number
}

export type MintOffchainTokensResponse = TxResponse

const mutationMap: Record<MutationMintOffchainTokens, DocumentNode> = {
    [MutationMintOffchainTokens.Mutation1]: mutation1,
}

export type MutationMintOffchainTokensParams = MutationParams<MutationMintOffchainTokens, MintOffchainTokensRequest>

export const mutationMintOffchainTokens = async ({
    mutation = MutationMintOffchainTokens.Mutation1,
    request
}: MutationMintOffchainTokensParams) => {
    if (!request) {
        throw new Error("Request is required for mint offchain tokens mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { mintOffchainTokens: MintOffchainTokensResponse },
        MutationVariables<MintOffchainTokensRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 