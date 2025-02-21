import { UseSWRMutation } from "../types"
import {
    queryStatic,
    QueryStaticResponse,
} from "@/modules/apollo"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { ApolloQueryResult } from "@apollo/client"

export const useQueryStaticSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<QueryStaticResponse>
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async () => {
            return await queryStatic()
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
