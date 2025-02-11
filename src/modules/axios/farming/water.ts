import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface WaterRequest {
    placedItemTileId: string
}

export const water = (
    request: WaterRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, WaterRequest>,
    WaterRequest
  >(`${version}/gameplay/water`, request)
