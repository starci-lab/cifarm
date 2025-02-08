import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import {
    updateTutorial,
} from "@/modules/axios"
import { v4 } from "uuid"
import { WithAxiosOptions } from "./types"

export type UseApiUpdateTutorialSwrMutationArgs = WithAxiosOptions

export const useApiUpdateTutorialSwrMutation = (): UseSWRMutation<
  void,
  UseApiUpdateTutorialSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUpdateTutorialSwrMutationArgs }
        ) => {
            const { options } = { ...extraArgs.arg }
            console.log("called")
            //update the tutorial only
            await updateTutorial(options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
