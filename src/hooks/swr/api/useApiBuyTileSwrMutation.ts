import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { BuyTileRequest, buyTile } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiBuyTileSwrMutationArgs = WithAxiosOptionsAndRequest<BuyTileRequest>

export const useApiBuyTileSwrMutation = (): UseSWRMutation<
  void,
  UseApiBuyTileSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiBuyTileSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            await buyTile(request, options)
        }
    )

    return {
        swrMutation,
    }
}
