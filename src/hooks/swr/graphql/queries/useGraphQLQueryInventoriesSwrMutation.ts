import { UseSWRMutation } from "../../types"
import {
    queryInventories,
    QueryInventoriesResponse,
    QueryInventoriesParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"

export const useGraphQLQueryInventoriesSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryInventoriesResponse>,
  QueryInventoriesParams
> => {
    const [params, setParams] = useState<QueryInventoriesParams>({})
    const swrMutation = useSWRMutation(
        v4(),
        async (_: string, extraArgs: { arg: QueryInventoriesParams }) => {
            const { ...args } = { ...extraArgs.arg }
            return await queryInventories({ ...params, ...args })
        }
    )

    //return the state and the data
    return {
        swrMutation,
        setParams,
        params,
    } as UseSWRMutation<ApolloQueryResult<QueryInventoriesResponse>, QueryInventoriesParams>
} 