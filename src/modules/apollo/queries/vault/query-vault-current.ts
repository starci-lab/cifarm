import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import {
    QueryParams,
} from "../../types"
import { TokenKey } from "@/modules/entities"

const query1 = gql`
  query VaultCurrent {
    vaultCurrent{  
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

export type QueryVaultCurrentParams = QueryParams<QueryVaultCurrent>;
export const queryVaultCurrent = async ({
    query = QueryVaultCurrent.Query1,
}: QueryVaultCurrentParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryVaultCurrentResponseWrapper
  >({
      query: queryDocument
  })
}
