import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface PlantSeedRequest {
    inventorySeedId: string
    placedItemTileId: string
}

export const plantSeed = (
    request: PlantSeedRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, PlantSeedRequest>,
    PlantSeedRequest
  >(`${version}/gameplay/plant-seed`, request)
