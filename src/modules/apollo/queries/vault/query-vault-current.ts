import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import {
    QueryParams,
    QueryVariables,
} from "../../types"
import { Network } from "@/modules/blockchain"
import { TokenKey } from "@/modules/entities"

const query1 = gql`
  query VaultCurrent($request: VaultCurrentRequest!) {
    vaultCurrent(request: $request) {  
      data {
        tokenKey
        tokenLocked
      }
      vaultAddress
    }
  }
`

export interface QueryVaultCurrentResponse {
    data: Array<{
      tokenKey: TokenKey
      tokenLocked: number
    }>
    vaultAddress: string
}

export interface QueryVaultCurrentResponseWrapper {
    vaultCurrent: QueryVaultCurrentResponse
}

export enum QueryVaultCurrent {
  Query1 = "query1",
}

const queryMap: Record<QueryVaultCurrent, DocumentNode> = {
    [QueryVaultCurrent.Query1]: query1,
}

export interface QueryVaultCurrentArgs {
  network: Network
}

export type QueryVaultCurrentParams = QueryParams<QueryVaultCurrent, QueryVaultCurrentArgs>;
export const queryVaultCurrent = async ({
    query = QueryVaultCurrent.Query1,
    request = { network: Network.Testnet },
}: QueryVaultCurrentParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryVaultCurrentResponseWrapper,
    QueryVariables<QueryVaultCurrentArgs>
  >({
      query: queryDocument,
      variables: {
          request,
      },
  })
}
