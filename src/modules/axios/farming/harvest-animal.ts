import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface HarvestAnimalRequest {
    placedItemAnimalId: string
}

export interface HarvestAnimalResponse {
    quantity: number
}

export const harvestAnimal = (
    request: HarvestAnimalRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    HarvestAnimalResponse,
    AxiosResponse<HarvestAnimalResponse, HarvestAnimalRequest>,
    HarvestAnimalRequest
  >(`${version}/gameplay/harvest-animal`, request)
