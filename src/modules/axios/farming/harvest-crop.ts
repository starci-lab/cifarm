import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { EmptyObject } from "@/modules/common"

export interface HarvestCropRequest {
    placedItemTileId: string
}

export const harvestCrop = (
    request: HarvestCropRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, HarvestCropRequest>,
    HarvestCropRequest
  >(`${version}/gameplay/harvest-crop`, request)
