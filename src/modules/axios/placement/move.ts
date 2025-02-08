import { Position } from "@/modules/entities"
import { AxiosResponse } from "axios"
import { EmptyObject } from "react-hook-form"
import { authAxios } from "../auth-axios"
import { Version, AxiosOptions } from "../types"

export interface MoveRequest {
    placedItemId: string
    position: Position
}

export const move = (
    request: MoveRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, MoveRequest>,
    MoveRequest
  >(`${version}/gameplay/move`, request)