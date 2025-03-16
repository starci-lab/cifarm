import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface ThiefFruitRequest {
    placedItemFruitId: string
}

export interface ThiefFruitResponse {
    quantity: number
}

export const thiefFruit = (
    request: ThiefFruitRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    ThiefFruitResponse,
    AxiosResponse<ThiefFruitResponse, ThiefFruitRequest>,
    ThiefFruitRequest
  >(`${version}/gameplay/thief-fruit`, request)