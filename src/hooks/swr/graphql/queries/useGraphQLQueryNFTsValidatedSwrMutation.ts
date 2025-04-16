import { UseSWRMutation } from "../../types"
import {
    QueryNFTsValidatedParams,
    QueryNFTsValidatedResponse,
    queryNFTsValidated,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import useSWRMutation from "swr/mutation"

export const useGraphQLQueryNFTsValidatedSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryNFTsValidatedResponse>,
  QueryNFTsValidatedParams
> => {
    const swrMutation = useSWRMutation(
        "QUERY_NFTS_VALIDATED_MUTATION",
        async (_: string, extraArgs: { arg: QueryNFTsValidatedParams }) => {
            const { ...args } = { ...extraArgs.arg }
            return await queryNFTsValidated({ ...args })
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
