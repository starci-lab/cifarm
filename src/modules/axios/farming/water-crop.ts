import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface WaterCropRequest {
    placedItemTileId: string
}

export const waterCrop = (
    request: WaterCropRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, WaterCropRequest>,
    WaterCropRequest
  >(`${version}/gameplay/water-crop`, request)
