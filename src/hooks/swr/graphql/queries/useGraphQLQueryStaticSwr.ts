import { UseSWR } from "../../types"
import {
    QueryStaticResponse,
    queryStatic,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import useSWR from "swr"

export const useGraphQLQueryStaticSwr: () => UseSWR<
  ApolloQueryResult<QueryStaticResponse>,
  void
> = () => {
    const swr = useSWR(
        "QUERY_STATIC",
        async () => {
            return await queryStatic()
        }
    )

    //return the state and the data
    return {
        swr,
    }
}
