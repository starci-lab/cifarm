import { UseSWRMutation } from "../../types"
import {
    queryInventories,
    QueryInventoriesParams,
    QueryInventoriesResponse,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"

export const useGraphQLQueryInventoriesSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryInventoriesResponse>,
  QueryInventoriesParams
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (_: string, extraArgs: { arg: QueryInventoriesParams }) => {
            const { ...args } = { ...extraArgs.arg }
            return await queryInventories({ ...args })
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
} 