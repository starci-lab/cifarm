import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface HarvestFruitRequest {
    placedItemFruitId: string
}

export interface HarvestFruitResponse {
    quantity: number
}

export const harvestFruit = (
    request: HarvestFruitRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    HarvestFruitResponse,
    AxiosResponse<HarvestFruitResponse, HarvestFruitRequest>,
    HarvestFruitRequest
  >(`${version}/gameplay/harvest-fruit`, request)
