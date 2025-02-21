import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { EmptyObject } from "@/modules/common"

export interface DeliverProductRequest {
  inventoryId: string;
  quantity: number;
  index: number;
}

export const deliverProduct = (
    request: DeliverProductRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject>,
    DeliverProductRequest
  >(`${version}/gameplay/deliver-product`, request)
