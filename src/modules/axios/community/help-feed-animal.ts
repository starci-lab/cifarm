import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface HelpFeedAnimalRequest {
    placedItemAnimalId: string
    inventorySupplyId: string
}

export const helpFeedAnimal = (
    request: HelpFeedAnimalRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, HelpFeedAnimalRequest>,
    HelpFeedAnimalRequest
  >(`${version}/gameplay/help-feed-animal`, request)