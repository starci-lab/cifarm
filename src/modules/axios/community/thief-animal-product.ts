import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface ThiefAnimalProductRequest {
    placedItemAnimalId: string
}

export interface ThiefAnimalProductResponse {
    quantity: number
}

export const thiefAnimalProduct = (
    request: ThiefAnimalProductRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    ThiefAnimalProductResponse,
    AxiosResponse<ThiefAnimalProductResponse, ThiefAnimalProductRequest>,
    ThiefAnimalProductRequest
  >(`${version}/gameplay/thief-animal-product`, request)