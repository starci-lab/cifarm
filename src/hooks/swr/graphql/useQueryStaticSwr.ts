import { queryStatic, QueryStaticResponse } from "@/modules/apollo"
import useSWR from "swr"
import { v4 } from "uuid"
import { UseSWR } from "../types"

//single query for static data
export const useQueryStaticSwr = (): UseSWR<QueryStaticResponse> => {
    const swr = useSWR(v4(), async () => {
        const requestMessageResponse = await queryStatic()
        return requestMessageResponse.data
    })

    //return the state and the data
    return {
        swr,
    }
}
