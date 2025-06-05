import { UseSWR } from "../../types"
import {
    queryInventories,
    QueryInventoriesParams,
    QueryInventoriesResponseWrapper,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import { useAppSelector, useAppDispatch, setInventories } from "@/redux"
import useSWR from "swr"

export const useGraphQLQueryInventoriesSwr = (): UseSWR<
  ApolloQueryResult<QueryInventoriesResponseWrapper>,
  QueryInventoriesParams
> => {
    const dispatch = useAppDispatch()
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const swr = useSWR(
        authenticated ? ["QUERY_INVENTORIES"] : null,
        async () => {
            const response = await queryInventories()
            dispatch(setInventories(response.data.inventories))
            return response
        }
    )
    //return the state and the data
    return {
        swr,
    }
} 