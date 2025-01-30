import { UseSWR } from "../types"
import { v4 } from "uuid"
import { UserEntity } from "@/modules/entities"
import { QueryUser, queryUser } from "@/modules/apollo"
import useSWR from "swr"
import { useAppSelector } from "@/redux"

export type UseQueryUserSwrParams = Partial<{
  query: QueryUser;
}>

export const useQueryUserSwr = (params: UseQueryUserSwrParams = {}): UseSWR<
  UserEntity,
  UseQueryUserSwrParams
> => {
    const authenticated = useAppSelector(state => state.gameReducer.authenticated)

    const swr = useSWR(
        authenticated ? v4() : null,
        async () => {
            const { query } = params
            const requestMessageResponse = await queryUser(query)
            return requestMessageResponse.data
        }
    )

    //return the state and the data
    return {
        swr,
    }
}
