import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { UpdateInventoryIndexRequest, updateInventoryIndex } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiUpdateInventoryIndexSwrMutationArgs = WithAxiosOptionsAndRequest<UpdateInventoryIndexRequest>

export const useApiUpdateInventoryIndexSwrMutation = (): UseSWRMutation<
  void,
  UseApiUpdateInventoryIndexSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUpdateInventoryIndexSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await updateInventoryIndex(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
