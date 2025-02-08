import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { EmptyObject } from "@/modules/common"

export interface CollectAnimalProductRequest {
    placedItemAnimalId: string
}

export const collectAnimalProduct = (
    request: CollectAnimalProductRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, CollectAnimalProductRequest>,
    CollectAnimalProductRequest
  >(`${version}/gameplay/collect-animal-product`, request)
