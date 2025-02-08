import { AxiosResponse } from "axios"
import { EmptyObject } from "react-hook-form"
import { authAxios } from "../auth-axios"
import { Version, AxiosOptions } from "../types"

export interface UpgradeBuildingRequest {
    placedItemBuildingId: string
}

export const upgradeBuilding = (
    request: UpgradeBuildingRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, UpgradeBuildingRequest>,
    UpgradeBuildingRequest
  >(`${version}/gameplay/upgrade-building`, request)