import { AxiosResponse } from "axios"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { EmptyObject } from "@/modules/common"

export interface RetainProductRequest {
  inventoryId: string;
}

export const retainProduct = (
    request: RetainProductRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject>,
    RetainProductRequest
  >(`${version}/gameplay/retain-product`, request)
    