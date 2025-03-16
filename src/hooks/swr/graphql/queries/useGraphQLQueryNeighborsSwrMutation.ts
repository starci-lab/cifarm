import { UseSWRMutation } from "../../types"
import {
    queryNeighbors,
    QueryNeighborsResponse,
    QueryNeighborsParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { defaultRequest } from "../constants"

export const useGraphQLQueryNeighborsSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryNeighborsResponse>,
  QueryNeighborsParams
> => {
    const [params, setParams] = useState<QueryNeighborsParams>({
        request: defaultRequest
    })
    const swrMutation = useSWRMutation(
        v4(),
        async (_: string, extraArgs: { arg: QueryNeighborsParams }) => {
            const { ...args } = { ...extraArgs.arg }
            return await queryNeighbors({ ...params, ...args })
        }
    )

    //return the state and the data
    return {
        swrMutation,
        setParams,
        params,
    } as UseSWRMutation<ApolloQueryResult<QueryNeighborsResponse>, QueryNeighborsParams>
} 