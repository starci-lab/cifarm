import { DeliveringProductSchema } from "@/modules/entities"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../auth-client"
import { IPaginatedResponse } from "../types"

const query1 = gql`
  query ($args: GetDeliveringProductsArgs!) {
    deliveringProducts(args: $args) {
        data {
          id
          product
          index
          quantity
        }
    }
  }
`

export enum QueryDeliveringProducts {
  Query1 = "query1",
}

export interface QueryDeliveringProductsResponse {
    deliveringProducts: IPaginatedResponse<DeliveringProductSchema>
}

const queryMap: Record<QueryDeliveringProducts, DocumentNode> = {
    [QueryDeliveringProducts.Query1]: query1,
}

export const queryDeliveringProducts = async (
    query: QueryDeliveringProducts = QueryDeliveringProducts.Query1,
    limit: number = 9,
    offset: number = 0
) => {
    const queryDocument = queryMap[query]
    return noCacheAuthClient.query<QueryDeliveringProductsResponse>({
        query: queryDocument,
        variables: {
            args: { limit, offset }
        },
    })
}
