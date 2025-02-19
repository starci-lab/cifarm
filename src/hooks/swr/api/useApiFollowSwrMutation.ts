import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { follow, FollowRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiFollowSwrMutationArgs = WithAxiosOptionsAndRequest<FollowRequest>

export const useApiFollowSwrMutation = (): UseSWRMutation<
  void,
  UseApiFollowSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiFollowSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await follow(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
