import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import {
    updateFollowX,
} from "@/modules/axios"
import { v4 } from "uuid"
import { WithAxiosOptions } from "./types"

export type UseApiUpdateFollowXSwrMutationArgs = WithAxiosOptions

export const useApiUpdateFollowXSwrMutation = (): UseSWRMutation<
  void,
  UseApiUpdateFollowXSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUpdateFollowXSwrMutationArgs }
        ) => {
            const { options } = { ...extraArgs.arg }
            //update the tutorial only
            await updateFollowX(options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
