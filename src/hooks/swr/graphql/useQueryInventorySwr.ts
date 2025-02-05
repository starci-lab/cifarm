import { UseSWR } from "../types"
import { v4 } from "uuid"
import { InventoryEntity } from "@/modules/entities"
import useSWR from "swr"
import { useAppSelector } from "@/redux"
import { QueryInventory, queryInventory } from "@/modules/apollo"

export type UseQueryInventorySwrParams = Partial<{
  query: QueryInventory;
}>

export const useQueryInventorySwr = (params: UseQueryInventorySwrParams = {}): UseSWR<
  Array<InventoryEntity>,
  UseQueryInventorySwrParams
> => {
    const authenticated = useAppSelector(state => state.gameReducer.authenticated)

    const swr = useSWR(
        authenticated ? v4() : null,
        async () => {
            const { query } = params
            const requestMessageResponse = await queryInventory(query)
            return requestMessageResponse.data
        }
    )

    //return the state and the data
    return {
        swr
    }
}
