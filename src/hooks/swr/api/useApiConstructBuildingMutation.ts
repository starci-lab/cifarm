import { ConstructBuildingRequest, constructBuilding } from "@/modules/axios"
import useSWRMutation from "swr/mutation"
import { v4 } from "uuid"
import { UseSWRMutation } from "../types"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiConstructBuildingSwrMutationArgs = WithAxiosOptionsAndRequest<ConstructBuildingRequest>

export const useApiConstructBuildingSwrMutation = (): UseSWRMutation<
  void,
  UseApiConstructBuildingSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiConstructBuildingSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await constructBuilding(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
