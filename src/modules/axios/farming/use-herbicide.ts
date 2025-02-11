import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface UseHerbicideRequest {
    placedItemTileId: string
}

export const useHerbicide = (
    request: UseHerbicideRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, UseHerbicideRequest>,
    UseHerbicideRequest
  >(`${version}/gameplay/use-herbicide`, request)
