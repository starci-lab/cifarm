import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface SellRequest {
    placedItemId: string
}
export interface SellResponse {
    quantity: number
}

export const sell = (
    request: SellRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    SellResponse,
    AxiosResponse<SellResponse, SellRequest>,
    SellRequest
  >(`${version}/gameplay/sell`, request)