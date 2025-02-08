import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import {
    spin,
} from "@/modules/axios"
import { v4 } from "uuid"
import { WithAxiosOptions } from "./types"

export type UseApiSpinSwrMutationArgs = WithAxiosOptions

export const useApiSpinSwrMutation = (): UseSWRMutation<
  void,
  UseApiSpinSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiSpinSwrMutationArgs }
        ) => {
            const { options } = { ...extraArgs.arg }
            //update the tutorial only
            await spin(options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
