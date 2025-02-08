import { SupplyId } from "@/modules/entities"
import { AxiosOptions, Version } from "../types"
import { authAxios } from "../auth-axios"
import { EmptyObject } from "@/modules/common"
import { AxiosResponse } from "axios"

export interface BuySuppliesRequest {
    supplyId: SupplyId
    quantity: number
}

export const buySupplies = (
    request: BuySuppliesRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, BuySuppliesRequest>,
    BuySuppliesRequest
  >(`${version}/gameplay/buy-supplies`, request)
