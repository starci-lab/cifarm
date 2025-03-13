import { BuyBuildingRequest, buyBuilding } from "@/modules/axios"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { UseSWRMutation } from "../types"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiBuyBuildingSwrMutationArgs = WithAxiosOptionsAndRequest<BuyBuildingRequest>

export const useApiBuyBuildingSwrMutation = (): UseSWRMutation<
  void,
  UseApiBuyBuildingSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiBuyBuildingSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await buyBuilding(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
