import { EmptyObject } from "@/modules/common"
import { authAxios } from "../auth-axios"
import { AxiosOptions, Version } from "../types"
import { AxiosResponse } from "axios"

export interface HelpUseBugNetRequest {
    placedItemFruitId: string
}

export const helpUseBugNet = (
    request: HelpUseBugNetRequest,
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post<
    EmptyObject,
    AxiosResponse<EmptyObject, HelpUseBugNetRequest>,
    HelpUseBugNetRequest
  >(`${version}/gameplay/help-use-bug-net`, request)