import { AxiosResponse } from "axios"
import { EmptyObject } from "react-hook-form"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface HelpWaterRequest {
    placedItemTileId: string
}

export const helpWater = (
    request: HelpWaterRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, HelpWaterRequest>,
    HelpWaterRequest
  >(`${version}/gameplay/help-water`, request)