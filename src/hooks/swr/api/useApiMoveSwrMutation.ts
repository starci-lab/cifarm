import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { MoveRequest, move } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiMoveSwrMutationArgs = WithAxiosOptionsAndRequest<MoveRequest>

export const useApiMoveSwrMutation = (): UseSWRMutation<
  void,
  UseApiMoveSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiMoveSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            await move(request, options)
        }
    )

    return {
        swrMutation,
    }
}
