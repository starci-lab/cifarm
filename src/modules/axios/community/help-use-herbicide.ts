import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface HelpUseHerbicideRequest {
    placedItemTileId: string
}

export const helpUseHerbicide = (
    request: HelpUseHerbicideRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, HelpUseHerbicideRequest>,
    HelpUseHerbicideRequest
  >(`${version}/gameplay/help-use-herbicide`, request)