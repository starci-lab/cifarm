import { UseSWRMutation } from "../types"
import {
    QueryNeighbors,
    queryNeighbors,
    QueryNeighborsArgs,
    QueryNeighborsParams,
    QueryNeighborsResponse,
    QueryParams,
} from "@/modules/apollo"
import useSWRMutation from "swr/mutation"
import { ApolloQueryResult } from "@apollo/client"
import { v4 } from "uuid"

export const useQueryNeighborsSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryNeighborsResponse>,
  QueryNeighborsParams
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: QueryNeighborsParams }
        ) => {
            const { arg } = { ...extraArgs }
            return await queryNeighbors(arg)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
