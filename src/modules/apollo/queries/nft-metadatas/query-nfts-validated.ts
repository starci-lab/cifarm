import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { QueryParams } from "../../types"
import { QueryVariables } from "../../types"

export interface QueryNFTsValidatedRequest {
  nftAddresses: Array<string>
}

export interface NFTValidatedMetadata {
  nftAddress: string
  validated: boolean
}

export interface NFTValidatedMetadataResponse {
  nftsValidated: Array<NFTValidatedMetadata>
}

const query1 = gql`
  query NFTValidatedMetadata($request: NFTsValidatedRequest!) {
    nftsValidated(request: $request) {
      nftAddress
      validated 
    }
  }
`

export enum QueryNFTsValidated {
  Query1 = "query1",
}

const queryMap: Record<QueryNFTsValidated, DocumentNode> = {
    [QueryNFTsValidated.Query1]: query1,
}

export interface QueryNFTsValidatedRequest {
  nftAddresses: Array<string>
}

export type QueryNFTsValidatedParams = QueryParams<
  QueryNFTsValidated,
  QueryNFTsValidatedRequest
>;

export interface NFTValidated {
  nftAddress: string
  validated: boolean
}

export interface QueryNFTsValidatedResponse {
  nftsValidated: Array<NFTValidated>;
}

export const queryNFTsValidated = async ({
    query = QueryNFTsValidated.Query1,
    request,
}: QueryNFTsValidatedParams) => {
    if (!request?.nftAddresses) {
        throw new Error("nftAddresses is required")
    }
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryNFTsValidatedResponse,
    QueryVariables<QueryNFTsValidatedRequest>
  >({
      query: queryDocument,
      variables: {
          request
      }
  })
}
