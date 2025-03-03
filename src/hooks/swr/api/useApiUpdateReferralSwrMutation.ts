import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { updateReferral, UpdateReferralRequest } from "@/modules/axios"
import { v4 } from "uuid"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiUpdateReferralSwrMutationArgs =
  WithAxiosOptionsAndRequest<UpdateReferralRequest>;

export const useApiUpdateReferralSwrMutation = (): UseSWRMutation<
  void,
  UseApiUpdateReferralSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUpdateReferralSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            await updateReferral(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
