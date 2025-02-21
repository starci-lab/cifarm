import { AxiosResponse } from "axios"
import { EmptyObject } from "react-hook-form"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface ThiefCropRequest {
    placedItemTileId: string
}

export const thiefCrop = (
    request: ThiefCropRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, ThiefCropRequest>,
    ThiefCropRequest
  >(`${version}/gameplay/thief-crop`, request)