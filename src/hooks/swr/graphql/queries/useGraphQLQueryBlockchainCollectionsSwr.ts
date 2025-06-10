import { UseSWR } from "../../types"
import {
    queryBlockchainCollections,
    QueryBlockchainCollectionsParams,
    QueryBlockchainCollectionsResponseWrapper,
} from "@/modules/apollo"
import useSWR from "swr"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import { ChainKey } from "@/modules/blockchain"
import { useGlobalAccountAddress } from "@/hooks/useGlobalAccountAddress"
import { NFTType } from "@/modules/entities"
import _ from "lodash"

export const useGraphQLQueryBlockchainCollectionsSwr = (): UseSWR<
    ApolloQueryResult<QueryBlockchainCollectionsResponseWrapper>,
  QueryBlockchainCollectionsParams
> => {
    const { accountAddress } = useGlobalAccountAddress()

    const [params, setParams] = useState<QueryBlockchainCollectionsParams>({})

    const swr = useSWR(
        accountAddress ? ["QUERY_BLOCKCHAIN_COLLECTIONS", params] : null,
        async () => {
            if (!accountAddress) throw new Error("Account address is required")
            const _params = _.isEmpty(params) ? {
                request: {
                    accountAddress: accountAddress,
                    chainKey: ChainKey.Solana,
                    nftTypes: [
                        NFTType.DragonFruit,
                        NFTType.Jackfruit,
                        NFTType.Pomegranate,
                        NFTType.Rambutan,
                    ],
                    refresh: true,
                }
            } : params
            const response = await queryBlockchainCollections(_params)
            return response
        }
    )

    //return the state and the data
    return {
        params,
        setParams,
        swr,
    }
} 