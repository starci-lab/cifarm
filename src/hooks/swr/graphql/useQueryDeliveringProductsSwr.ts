import { UseSWR } from "../types"
import { v4 } from "uuid"
import useSWR from "swr"
import { useAppSelector } from "@/redux"
import { QueryDeliveringProducts, queryDeliveringProducts, QueryDeliveringProductsResponse } from "@/modules/apollo"

export type UseQueryDeliveringProductsSwrParams = Partial<{
  query: QueryDeliveringProducts;
}>

export const useQueryDeliveringProductsSwr = (params: UseQueryDeliveringProductsSwrParams = {}): UseSWR<
  QueryDeliveringProductsResponse,
  UseQueryDeliveringProductsSwrParams
> => {
    const authenticated = useAppSelector(state => state.gameReducer.authenticated)

    const swr = useSWR(
        authenticated ? v4() : null,
        async () => {
            const { query } = params
            const requestMessageResponse = await queryDeliveringProducts(query)
            return requestMessageResponse.data
        }
    )

    //return the state and the data
    return {
        swr
    }
}
