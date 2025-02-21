import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { unfollow, UnfollowRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiUnfollowSwrMutationArgs = WithAxiosOptionsAndRequest<UnfollowRequest>

export const useApiUnfollowSwrMutation = (): UseSWRMutation<
  void,
  UseApiUnfollowSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUnfollowSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await unfollow(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
