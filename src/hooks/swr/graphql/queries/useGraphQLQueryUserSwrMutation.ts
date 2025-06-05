import { UseSWRMutation } from "../../types"
import {
    queryUser,
    QueryUserResponseWrapper,
    QueryUserParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import useSWRMutation from "swr/mutation"

export const useGraphQLQueryUserSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryUserResponseWrapper>,
  QueryUserParams
> => {
    const swrMutation = useSWRMutation(
        "QUERY_USER_MUTATION",
        async (_: string, extraArgs: { arg: QueryUserParams }) => {
            const { ...args } = { ...extraArgs.arg }
            const data = await queryUser({ ...args })
            return data
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
