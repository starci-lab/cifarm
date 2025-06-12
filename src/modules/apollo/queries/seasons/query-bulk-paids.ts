import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import {
    QueryParams,
} from "../../types"
import { Network } from "@/modules/blockchain"

const query1 = gql`
  query BulkPaids($request: GetBulkPaidsRequest!) {
    bulkPaids(request: $request) {
      count
      decrementPercentage
      bulkId
    }
  }
`

export interface BulkPaid {
    count: number
    decrementPercentage: number
    bulkId: string
}

export type BulkPaidsResponse = Array<BulkPaid>

export interface QueryBulkPaidsResponseWrapper {
    bulkPaids: BulkPaidsResponse
}

export enum QueryBulkPaids {
  Query1 = "query1",
}

export interface QueryBulkPaidsRequest {
    network: Network
}

const queryMap: Record<QueryBulkPaids, DocumentNode> = {
    [QueryBulkPaids.Query1]: query1,
}

export type QueryBulkPaidsParams = QueryParams<QueryBulkPaids, QueryBulkPaidsRequest>;
export const queryBulkPaids = async ({
    query = QueryBulkPaids.Query1,
    request
}: QueryBulkPaidsParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryBulkPaidsResponseWrapper
  >({
      query: queryDocument,
      variables: {
          request
      }
  })
}
