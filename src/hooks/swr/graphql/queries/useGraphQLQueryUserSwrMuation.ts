import { UseSWRMutation } from "../../types"
import { queryUser, QueryUserResponse, QueryUserParams } from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useState } from "react"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"

export const useGraphQLQueryUserSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryUserResponse>,
  QueryUserParams
> => {
    const [params, setParams] = useState<QueryUserParams>({})
    const swrMutation = useSWRMutation(
        v4(),
        async (_: string, extraArgs: { arg: QueryUserParams }) => {
            const { ...args } = { ...extraArgs.arg }
            return await queryUser({ ...params, ...args })
        }
    )

    //return the state and the data
    return {
        swrMutation,
        setParams,
        params,
    } as UseSWRMutation<ApolloQueryResult<QueryUserResponse>, QueryUserParams>
} 