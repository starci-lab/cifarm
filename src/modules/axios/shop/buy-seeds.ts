import { CropId } from "@/modules/entities"
import { AxiosOptions, Version } from "../types"
import { authAxios } from "../auth-axios"
import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"

export interface BuySeedsRequest {
    cropId: CropId
    quantity: number
}

export const buySeeds = (
    request: BuySeedsRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, BuySeedsRequest>,
    BuySeedsRequest
  >(`${version}/gameplay/buy-seeds`, request)
