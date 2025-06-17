import { NFTCollectionKey } from "@/types"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { QueryParams } from "../../types"
import { QueryVariables } from "../../types"
import { ChainKey } from "@/modules/blockchain"

const query1 = gql`
  query BlockchainCollections($request: GetBlockchainCollectionsRequest!) {
    blockchainCollections(request: $request) {
      cached
      refreshInterval
      collections {
        nftCollectionKey
        nfts {
            description
            imageUrl
            attributes {
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
  nftCollectionKeys: Array<NFTCollectionKey>
  refresh: boolean
}

export type QueryBlockchainCollectionsParams = QueryParams<
  QueryBlockchainCollections,
  QueryBlockchainCollectionsRequest
>;

export interface QueryBlockchainCollectionsResponseWrapper {
  blockchainCollections: QueryBlockchainCollectionsResponse
}

export interface BlockchainNFTAttribute {
    key: string
    value: string
}

export interface BlockchainNFTData {
    description: string
    imageUrl: string
    attributes: Array<BlockchainNFTAttribute>
    nftAddress: string
    name: string
    wrapped: boolean
}
export interface BlockchainCollectionData {
  nftCollectionKey: NFTCollectionKey
  nfts: Array<BlockchainNFTData>
}

export interface QueryBlockchainCollectionsResponse {
  cached: boolean
  collections: Array<BlockchainCollectionData>
  refreshInterval: number
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
