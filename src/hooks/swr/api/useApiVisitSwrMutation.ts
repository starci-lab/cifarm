import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { visit, VisitRequest } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiVisitSwrMutationArgs = WithAxiosOptionsAndRequest<VisitRequest>

export const useApiVisitSwrMutation = (): UseSWRMutation<
  void,
  UseApiVisitSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiVisitSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            await visit(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
