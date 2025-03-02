import { UseSWRMutation } from "../types"
import {
    queryUser,
    QueryUserResponse,
    QueryUserParams,
} from "@/modules/apollo"
import useSWRMutation from "swr/mutation"
import { ApolloQueryResult } from "@apollo/client"
import { v4 } from "uuid"

export const useQueryUserSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryUserResponse>,
  QueryUserParams
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: QueryUserParams }
        ) => {
            const { arg } = { ...extraArgs }
            return await queryUser(arg)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
