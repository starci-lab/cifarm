import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { v4 } from "uuid"
import { harvestAnimal, HarvestAnimalRequest, HarvestAnimalResponse } from "@/modules/axios"
import { WithAxiosOptionsAndRequest } from "./types"
import { AxiosResponse } from "axios"

export type UseApiHarvestAnimalSwrMutationArgs = WithAxiosOptionsAndRequest<HarvestAnimalRequest>

export const useApiHarvestAnimalSwrMutation = (): UseSWRMutation<
  AxiosResponse<HarvestAnimalResponse>,
  UseApiHarvestAnimalSwrMutationArgs
> => {
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiHarvestAnimalSwrMutationArgs }
        ) => {
            const { request, options } = { ...extraArgs.arg }
            return await harvestAnimal(request, options)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
