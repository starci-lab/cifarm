import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface HelpCureAnimalRequest {
    placedItemAnimalId: string
}

export const helpCureAnimal = (
    request: HelpCureAnimalRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, HelpCureAnimalRequest>,
    HelpCureAnimalRequest
  >(`${version}/gameplay/help-cure-animal`, request)