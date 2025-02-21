import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface HarvestCropRequest {
    placedItemTileId: string
}

export interface HarvestCropResponse {
    quantity: number
}

export const harvestCrop = (
    request: HarvestCropRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    HarvestCropResponse,
    AxiosResponse<HarvestCropResponse, HarvestCropRequest>,
    HarvestCropRequest
  >(`${version}/gameplay/harvest-crop`, request)
