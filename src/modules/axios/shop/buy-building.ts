import { BuildingId, Position } from "@/modules/entities"
import { AxiosOptions, Version } from "../types"
import { authAxios } from "../auth-axios"
import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"

export interface BuyBuildingRequest {
    buildingId: BuildingId
    position: Position
}

export const buyBuilding = (
    request: BuyBuildingRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, BuyBuildingRequest>,
    BuyBuildingRequest
  >(`${version}/gameplay/buy-building`, request)
