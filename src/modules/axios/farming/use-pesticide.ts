import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface UsePesticideRequest {
    placedItemTileId: string
}

export const usePesticide = (
    request: UsePesticideRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, UsePesticideRequest>,
    UsePesticideRequest
  >(`${version}/gameplay/use-pesticide`, request)
