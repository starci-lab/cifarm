import { AnimalId, Position } from "@/modules/entities"
import { AxiosOptions, Version } from "../types"
import { authAxios } from "../auth-axios"
import { AxiosResponse } from "axios"
import { EmptyObject } from "@/modules/common"

export interface BuyAnimalRequest {
  animalId: AnimalId;
  position: Position;
}

export const buyAnimal = (
    request: BuyAnimalRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, BuyAnimalRequest>,
    BuyAnimalRequest
  >(`${version}/gameplay/buy-animal`, request)
