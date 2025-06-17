import { UseSWR } from "../../types"
import {
    QueryLeaderboardResponseWrapper,
    QueryLeaderboardParams,
    queryLeaderboard,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import useSWR from "swr"
import { envConfig } from "@/env"

export const useGraphQLQueryLeaderboardSwr = (): UseSWR<
  ApolloQueryResult<QueryLeaderboardResponseWrapper>,
  QueryLeaderboardParams
> => {
    const [params, setParams] = useState<QueryLeaderboardParams>({
        request: {
            network: envConfig().network,
            limit: 10,
        }
    })
    const swr = useSWR(
        ["QUERY_LEADERBOARD", params],
        async () => {
            return await queryLeaderboard(params)
        }
    )
    //return the state and the data
    return {
        swr,
        setParams,
        params,
    }
} 