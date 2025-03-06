import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { UpgradeBuildingRequest, upgradeBuilding } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiUpgradeBuildingSwrMutationArgs = WithAxiosOptionsAndRequest<UpgradeBuildingRequest>

export const useApiUpgradeBuildingSwrMutation = (): UseSWRMutation<
  void,
  UseApiUpgradeBuildingSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiUpgradeBuildingSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await upgradeBuilding(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
