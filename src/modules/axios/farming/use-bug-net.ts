import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface UseBugNetRequest {
    placedItemFruitId: string
}

export const useBugNet = (
    request: UseBugNetRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, UseBugNetRequest>,
    UseBugNetRequest
  >(`${version}/gameplay/use-bug-net`, request)