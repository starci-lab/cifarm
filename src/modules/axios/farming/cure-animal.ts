import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { EmptyObject } from "@/modules/common"

export interface CureAnimalRequest {
    placedItemAnimalId: string,
    inventorySupplyId: string
}

export const cureAnimal = (
    request: CureAnimalRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, CureAnimalRequest>,
    CureAnimalRequest
  >(`${version}/gameplay/cure-animal`, request)

