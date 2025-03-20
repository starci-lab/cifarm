import { UseSWRMutation } from "../../types"
import {
    queryInventories,
    QueryInventoriesParams,
} from "@/modules/apollo"
import { ApolloQueryResult } from "@apollo/client"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { InventorySchema } from "@/modules/entities"

export const useGraphQLQueryInventoriesSwrMutation = (): UseSWRMutation<
  ApolloQueryResult<Array<InventorySchema>>,
  QueryInventoriesParams
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (_: string, extraArgs: { arg: QueryInventoriesParams }) => {
            const { ...args } = { ...extraArgs.arg }
            return await queryInventories({ ...args })
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
} 