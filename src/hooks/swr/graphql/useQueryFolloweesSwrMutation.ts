import { UseSWRMutation } from "../types"
import {
    queryFollowees,
    QueryFolloweesParams,
    QueryFolloweesResponse,
} from "@/modules/apollo"
import useSWRMutation from "swr/mutation"
import { ApolloQueryResult } from "@apollo/client"
import { v4 } from "uuid"

export const useQueryFolloweesSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryFolloweesResponse>,
  QueryFolloweesParams
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: QueryFolloweesParams }
        ) => {
            const { arg } = { ...extraArgs }
            return await queryFollowees(arg)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
