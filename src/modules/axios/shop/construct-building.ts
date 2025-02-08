import { BuildingId, Position } from "@/modules/entities"
import { AxiosOptions, Version } from "../types"
import { authAxios } from "../auth-axios"
import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"

export interface ConstructBuildingRequest {
    buildingId: BuildingId
    position: Position
}

export const constructBuilding = (
    request: ConstructBuildingRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, ConstructBuildingRequest>,
    ConstructBuildingRequest
  >(`${version}/gameplay/construct-building`, request)
