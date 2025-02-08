import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface HelpUsePesticideRequest {
    placedItemTileId: string
}

export const helpUsePesticide = (
    request: HelpUsePesticideRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, HelpUsePesticideRequest>,
    HelpUsePesticideRequest
  >(`${version}/gameplay/help-use-pesticide`, request)