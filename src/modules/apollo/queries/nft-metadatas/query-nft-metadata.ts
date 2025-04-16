import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { QueryParams, QuerySingleRequest } from "../../types"
import { QueryVariables } from "../../types"
import { NFTMetadataSchema } from "@/modules/entities/gameplay/schemas/nft-metadata"

const query1 = gql`
  query QueryNFTMetadata($id: ID!) {
    nftMetadata(id: $id) {
      collectionAddress
      id
      nftAddress
      nftName
      user
      validated
    }
  }
`

export enum QueryNFTMetadata {
  Query1 = "query1",
}

const queryMap: Record<QueryNFTMetadata, DocumentNode> = {
    [QueryNFTMetadata.Query1]: query1,
}

export type QueryNFTMetadataRequest = QuerySingleRequest

export type QueryNFTMetadataParams = QueryParams<
  QueryNFTMetadata,
  QueryNFTMetadataRequest
>;

export interface QueryNFTMetadataResponse {
  nftMetadata: NFTMetadataSchema;
}

export const queryNFTMetadata = async ({
    query = QueryNFTMetadata.Query1,
    request,
}: QueryNFTMetadataParams) => {
    if (!request?.id) {
        throw new Error("id is required")
    }
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryNFTMetadataResponse,
    QueryVariables<QueryNFTMetadataRequest>
  >({
      query: queryDocument,
      variables: {
          request: {
              id: request.id,
          }
      }
  })
}
