import { UseSWR } from "../../types"
import {
    queryOccupiedPlacedItemCounts,
    QueryOccupiedPlacedItemCountsResponse,
    QueryOccupiedPlacedItemCountsParams,
} from "@/modules/apollo"
import { useState } from "react"
import {
    setOccupiedPlacedItemCounts,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import useSWR from "swr"

export const useGraphQLQueryOccupiedPlacedItemCounts = (): UseSWR<
  QueryOccupiedPlacedItemCountsResponse,
  QueryOccupiedPlacedItemCountsParams
> => {
    const [params, setParams] = useState<QueryOccupiedPlacedItemCountsParams>({})
    const authenticated = useAppSelector(
        (state) => state.sessionReducer.authenticated
    )
    const dispatch = useAppDispatch()
    const swr = useSWR(
        authenticated ? ["QUERY_OCCUPIED_PLACED_ITEM_COUNTS", params] : null,
        async () => {
            const response = await queryOccupiedPlacedItemCounts(params)
            dispatch(
                setOccupiedPlacedItemCounts(response.data.occupiedPlacedItemCounts)
            )
            return response.data.occupiedPlacedItemCounts
        }
    )

    //return the state and the data
    return {
        swr,
        setParams,
        params,
    }
}
