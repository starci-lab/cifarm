import { UseSWRMutation } from "../../types"
import {
    queryFollowees,
    QueryFolloweesResponse,
    QueryFolloweesParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { defaultRequest } from "../constants"
export const useGraphQLQueryFolloweesSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryFolloweesResponse>,
  QueryFolloweesParams
> => {
    const [params, setParams] = useState<QueryFolloweesParams>({
        request: defaultRequest
    })
    const swrMutation = useSWRMutation(
        v4(),
        async (_: string, extraArgs: { arg: QueryFolloweesParams }) => {
            const { ...args } = { ...extraArgs.arg }
            return await queryFollowees({ ...params, ...args })
        }
    )

    //return the state and the data
    return {
        swrMutation,
        setParams,
        params,
    } as UseSWRMutation<ApolloQueryResult<QueryFolloweesResponse>, QueryFolloweesParams>
} 