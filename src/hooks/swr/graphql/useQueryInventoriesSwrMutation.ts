import { UseSWRMutation } from "../types"
import {
    queryInventories,
    QueryInventoriesParams,
    QueryInventoriesResponse,
} from "@/modules/apollo"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { ApolloQueryResult } from "@apollo/client"

export const useQueryInventoriesSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryInventoriesResponse>,
  QueryInventoriesParams
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: QueryInventoriesParams }
        ) => {
            const { arg } = { ...extraArgs }
            return await queryInventories(arg)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
