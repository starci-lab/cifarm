import { AxiosResponse } from "axios"
import { EmptyObject } from "react-hook-form"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"

export interface ThiefAnimalProductRequest {
    placedItemAnimalId: string
}

export const thiefAnimalProduct = (
    request: ThiefAnimalProductRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, ThiefAnimalProductRequest>,
    ThiefAnimalProductRequest
  >(`${version}/gameplay/thief-animal-product`, request)