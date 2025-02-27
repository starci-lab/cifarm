import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface FeedAnimalRequest {
    placedItemAnimalId: string
    inventorySupplyId: string
}

export const feedAnimal = (
    request: FeedAnimalRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, FeedAnimalRequest>,
    FeedAnimalRequest
  >(`${version}/gameplay/feed-animal`, request)
