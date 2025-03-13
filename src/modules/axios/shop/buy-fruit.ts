import { FruitId, Position } from "@/modules/entities"
import { AxiosOptions, Version } from "../types"
import { authAxios } from "../auth-axios"
import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"

export interface BuyFruitRequest {
    fruitId: FruitId
    position: Position
}

export const buyFruit = (
    request: BuyFruitRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, BuyFruitRequest>,
    BuyFruitRequest
  >(`${version}/gameplay/buy-fruit`, request)
