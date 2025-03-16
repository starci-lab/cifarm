import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface UseFruitFertilizerRequest {
    placedItemFruitId: string
    inventorySupplyId: string
}

export const useFruitFertilizer = (
    request: UseFruitFertilizerRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, UseFruitFertilizerRequest>,
    UseFruitFertilizerRequest
  >(`${version}/gameplay/use-fruit-fertilizer`, request)