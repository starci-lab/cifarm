import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface UseFertilizerRequest {
    inventorySupplyId: string
    placedItemTileId: string
}

export const useFertilizer = (
    request: UseFertilizerRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, UseFertilizerRequest>,
    UseFertilizerRequest
  >(`${version}/gameplay/use-fertilizer`, request)
