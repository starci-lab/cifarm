import { TokenKey } from "@/types"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { QueryParams } from "../../types"
import { QueryVariables } from "../../types"
import { ChainKey } from "@/modules/blockchain"

const query1 = gql`
  query BlockchainBalances($request: GetBlockchainBalancesRequest!) {
    blockchainBalances(request: $request) {
      cached
      refreshInterval
      tokens {
        balance
        tokenKey
      }
    }
  }
`

export enum QueryBlockchainBalances {
  Query1 = "query1",
}

const queryMap: Record<QueryBlockchainBalances, DocumentNode> = {
    [QueryBlockchainBalances.Query1]: query1,
}

export interface QueryBlockchainBalancesRequest {
  accountAddress: string
  tokenKeys: Array<TokenKey>
  chainKey: ChainKey
  refresh: boolean
}

export type QueryBlockchainBalancesParams = QueryParams<
  QueryBlockchainBalances,
  QueryBlockchainBalancesRequest
>;

export interface QueryBlockchainBalancesResponseWrapper {
  blockchainBalances: QueryBlockchainBalancesResponse
}

export interface BlockchainBalanceData {
  balance: number
  tokenKey: TokenKey
}

export interface QueryBlockchainBalancesResponse {
  cached: boolean
  refreshInterval: number
  tokens: Array<BlockchainBalanceData>
}

export const queryBlockchainBalances = async ({
    query = QueryBlockchainBalances.Query1,
    request,
}: QueryBlockchainBalancesParams) => {
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryBlockchainBalancesResponseWrapper,
    QueryVariables<QueryBlockchainBalancesRequest>
  >({
      query: queryDocument,
      variables: {
          request,
      },
  })
}
