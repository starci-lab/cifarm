import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { PlantSeedRequest, plantSeed } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"

export type UseApiPlantSeedSwrMutationArgs = WithAxiosOptionsAndRequest<PlantSeedRequest>

export const useApiPlantSeedSwrMutation = (): UseSWRMutation<
  void,
  UseApiPlantSeedSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiPlantSeedSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            //update the tutorial only
            await plantSeed(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
