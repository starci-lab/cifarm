import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { EmptyObject } from "@/modules/common"

export interface DeliverMoreProductRequest {
  inventoryId: string;
  quantity: number;
  index: number;
}

export const deliverMoreProduct = (
    request: DeliverMoreProductRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject>,
    DeliverMoreProductRequest
  >(`${version}/gameplay/deliver-more-product`, request)
