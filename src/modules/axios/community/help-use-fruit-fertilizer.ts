import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface HelpUseFruitFertilizerRequest {
    placedItemFruitId: string
    inventorySupplyId: string
}

export const helpUseFruitFertilizer = (
    request: HelpUseFruitFertilizerRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, HelpUseFruitFertilizerRequest>,
    HelpUseFruitFertilizerRequest
  >(`${version}/gameplay/help-use-fruit-fertilizer`, request)