import { UseSWR } from "../../types"
import {
    QueryNFTMetadataParams,
    QueryNFTMetadataResponse,
    queryNFTMetadata,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import useSWR from "swr"

export const useGraphQLQueryNFTMetadataSwr: () => UseSWR<
  ApolloQueryResult<QueryNFTMetadataResponse>,
  QueryNFTMetadataParams
> = () => {
    const swr = useSWR(
        "QUERY_NFT_METADATA",
        async (params: QueryNFTMetadataParams) => {
            return await queryNFTMetadata(params)
        }
    )

    //return the state and the data
    return {
        swr,
    }
}
