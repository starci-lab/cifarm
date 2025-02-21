import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface ThiefCropRequest {
    placedItemTileId: string
}

export interface ThiefCropResponse {
    quantity: number
}

export const thiefCrop = (
    request: ThiefCropRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    ThiefCropResponse,
    AxiosResponse<ThiefCropResponse, ThiefCropRequest>,
    ThiefCropRequest
  >(`${version}/gameplay/thief-crop`, request)