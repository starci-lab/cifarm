import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { MoveInventoryRequest, moveInventory } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiMoveInventorySwrMutationArgs = WithAxiosOptionsAndRequest<MoveInventoryRequest>

export const useApiMoveInventorySwrMutation = (): UseSWRMutation<
  void,
  UseApiMoveInventorySwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiMoveInventorySwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await moveInventory(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
