import { UseSWR } from "../types"
import { v4 } from "uuid"
import useSWR from "swr"
import { useAppSelector } from "@/redux"
import { QueryInventories, queryInventories, QueryInventoriesResponse } from "@/modules/apollo"

export type UseQueryInventoriesSwrParams = Partial<{
  query: QueryInventories;
}>

export const useQueryInventoriesSwr = (params: UseQueryInventoriesSwrParams = {}): UseSWR<
  QueryInventoriesResponse,
  UseQueryInventoriesSwrParams
> => {
    const authenticated = useAppSelector(state => state.gameReducer.authenticated)

    const swr = useSWR(
        authenticated ? v4() : null,
        async () => {
            const { query } = params
            const requestMessageResponse = await queryInventories(query)
            return requestMessageResponse.data
        }
    )

    //return the state and the data
    return {
        swr
    }
}
