import { NFTType } from "@/modules/entities"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { QueryParams } from "../../types"
import { QueryVariables } from "../../types"
import { ChainKey } from "@/modules/blockchain"

const query1 = gql`
  query BlockchainCollections($request: GetBlockchainCollectionsRequest!) {
    blockchainCollections(request: $request) {
      cached
      collections {
        nftType
        nfts {
            description
            imageUrl
            traits {
                key
                value
                }
            description
            name
            wrapped
            nftAddress
            }
        }
    }
  }
`

export enum QueryBlockchainCollections {
  Query1 = "query1",
}

const queryMap: Record<QueryBlockchainCollections, DocumentNode> = {
    [QueryBlockchainCollections.Query1]: query1,
}

export interface QueryBlockchainCollectionsRequest {
  accountAddress: string
  chainKey: ChainKey
  nftTypes: Array<NFTType>
  refresh: boolean
}

export type QueryBlockchainCollectionsParams = QueryParams<
  QueryBlockchainCollections,
  QueryBlockchainCollectionsRequest
>;

export interface QueryBlockchainCollectionsResponseWrapper {
  blockchainCollections: QueryBlockchainCollectionsResponse
}

export interface BlockchainNFTTrait {
    key: string
    value: string
}
export interface BlockchainNFTData {
    description: string
    imageUrl: string
    traits: Array<BlockchainNFTTrait>
    nftAddress: string
    name: string
    wrapped: boolean
}

export interface QueryBlockchainCollectionsResponse {
  cached: boolean
  collections: Array<{
    nftType: NFTType
    nfts: Array<BlockchainNFTData>
  }>
}

export const queryBlockchainCollections = async ({
    query = QueryBlockchainCollections.Query1,
    request,
}: QueryBlockchainCollectionsParams) => {
    if (!request) {
        throw new Error("Request is required")
    }
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryBlockchainCollectionsResponseWrapper,
    QueryVariables<QueryBlockchainCollectionsRequest>
  >({
      query: queryDocument,
      variables: {
          request,
      },
  })
}
